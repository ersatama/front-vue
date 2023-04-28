<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Soft vuln monitor
                </div>
                <div class="modalbox-detail-content-header-detail-desc">
                    Details #{{ data.id }}
                </div>
            </div>
            <div class="modalbox-detail-content-header-btns">
                <div class="modalbox-detail-content-header-btn">
                    <div class="modalbox-detail-content-header-btn-dots"></div>
                    <div class="modalbox-detail-content-header-btn-select">
                        <div class="modalbox-detail-content-header-btn-select-angle"></div>
                        <div class="block-body-content-table-item-option-select-list">
                            <div class="block-body-content-table-item-option-select-item">Edit</div>
                            <div class="block-body-content-table-item-option-select-item">Delete</div>
                        </div>
                    </div>
                </div>
                <div class="modalbox-detail-content-header-btn modalbox-detail-content-header-btn-close" @click="$emit('closeModal');"></div>
            </div>
        </div>
        <vue-custom-scrollbar class="modalbox-detail-content-scroll"  :settings="settings">
            <div class="modalbox-detail-content-body">
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.id">
                        {{ data.id }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Vendor</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.vendor">
                        {{ data.vendor }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Software</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.software">
                        {{ data.software }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Version</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.version">
                        {{ data.version }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Link <span v-if="parsedLinks.length > 0"> - {{ parsedLinks.length }}</span></div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-links" v-if="parsedLinks.length > 0">
                        <template v-if="parsedLinks.length > 5">
                            <template v-if="showFullLinks">
                                <a v-for="(link,linkKey) in parsedLinks" :key="linkKey" :href="link" class="modalbox-detail-content-item-link" target="_blank">{{ link }}</a>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullLinks = false">Hide links</div>
                            </template>
                            <template v-else>
                                <a :href="parsedLinks[0]" class="modalbox-detail-content-item-link" target="_blank">{{ parsedLinks[0] }}</a>
                                <a :href="parsedLinks[1]" class="modalbox-detail-content-item-link" target="_blank">{{ parsedLinks[1] }}</a>
                                <a :href="parsedLinks[2]" class="modalbox-detail-content-item-link" target="_blank">{{ parsedLinks[2] }}</a>
                                <a :href="parsedLinks[3]" class="modalbox-detail-content-item-link" target="_blank">{{ parsedLinks[3] }}</a>
                                <a :href="parsedLinks[4]" class="modalbox-detail-content-item-link" target="_blank">{{ parsedLinks[4] }}</a>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullLinks = true">Show all links - {{ parsedLinks.length - 5 }}</div>
                            </template>
                        </template>
                        <a v-else v-for="(link,linkKey) in parsedLinks" :key="linkKey" :href="link" class="modalbox-detail-content-item-link" target="_blank">{{ link }}</a>
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Alert</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.alert">{{ data.alert }}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Details</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-links" v-if="data.vuln">
                        <template v-if="isCutText">
                            <template v-if="!showFullDetails">
                                <div class="modalbox-detail-content-item-value-pre" v-html="findUrl(cutDetails)"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullDetails = true">Show full details</div>
                            </template>
                            <template v-else>
                                <div class="modalbox-detail-content-item-value-pre" v-html="findUrl(data.vuln)"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullDetails = false">Hide</div>
                            </template>
                        </template>
                        <div v-else class="modalbox-detail-content-item-value-pre" v-html="findUrl(data.vuln)"></div>
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Comment</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.comment">
                        {{ data.comment }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item modalbox-detail-content-item-object">
                    <div class="modalbox-detail-content-item-title">
                        Projects
                        <span v-if="data.projsoft && Object.entries(data.projsoft).length > 0"> - {{ Object.entries(data.projsoft).length }}</span>
                    </div>
                    <div class="modalbox-detail-content-item-list" v-for="(item,key) in data.projsoft" :key="key">
                        <div class="modalbox-detail-content-item-list-info" @click="checkSelected(item.id)">
                            Projsoft <span>#{{ item.id }}</span>
                            <div class="block-body-left-item-icon-arr" :class="{'modalbox-detail-content-item-list-arr':projsofts.includes(item.id)}"></div>
                        </div>
                        <div class="modalbox-detail-content-item-list-details" :class="{'modalbox-detail-content-item-list-details-hide':!projsofts.includes(item.id)}">
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.id">{{ item.id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Project ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <NuxtLink v-if="item.projectid" :to="'/dashboard/' + item.projectid">{{ item.projectid }}</NuxtLink>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Version</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.version">{{ item.version }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Last version</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.last_version">{{ item.last_version }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Source</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.source">
                                        <a :href="item.source" target="_blank">{{ item.source }}</a>
                                    </template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Date add</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <div class="modalbox-detail-content-item-list-view-value">
                                        <template v-if="item.date_add">{{ item.date_add }}</template>
                                        <template v-else>-</template>
                                    </div>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Date last check</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <div class="modalbox-detail-content-item-list-view-value">
                                        <template v-if="item.date_last_check">{{ item.date_last_check }}</template>
                                        <template v-else>-</template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </vue-custom-scrollbar>
    </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
    name: "projectSoftVulnDetail",
    props: ['data'],
    components: { vueCustomScrollbar },
    data() {
        return {
            projsofts: [],
            showFullLinks: false,
            showFullDetails: false,
            detailSize: 300,
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
            }
        }
    },
    computed: {
        isCutText() {
            let cut = false;
            if (this.data && this.data.vuln) {
                let size = this.data.vuln.trim().length;
                if (size > this.detailSize) {
                    cut = true;
                }
            }
            return cut;
        },
        cutDetails() {
            let text = '';
            if (this.data && this.data.vuln) {
                text = this.data.vuln.slice(0, this.detailSize);
                text += ' ...';
            }
            return text;
        },
        parsedLinks() {
            let list    =   [];
            if (this.data && this.data.link) {
                let splitLinks  =   this.data.link.split(',');
                splitLinks.forEach(link => {
                    list.push(link);
                    //html += '<a href="'+link+'" class="modalbox-detail-content-item-link" target="_blank">'+link+'</a>';
                });
            }
            return list;
        }
    },
    methods: {
        findUrl(text) {
            let urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.toString().replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            })
        },
        checkSelected(id) {
            if (this.projsofts.includes(id)) {
                let index = this.projsofts.indexOf(id);
                if (index !== -1) {
                    this.projsofts.splice(index, 1);
                }
            } else {
                this.projsofts.push(id);
            }
        },
    }
}
</script>

<style lang="scss">

</style>