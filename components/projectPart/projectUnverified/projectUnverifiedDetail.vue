<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Unverified
                </div>
                <div class="modalbox-detail-content-header-detail-desc">
                    #{{ data.id }}
                </div>
            </div>
            <div class="modalbox-detail-content-header-btns">
                <div class="modalbox-detail-content-header-btn">
                    <div class="modalbox-detail-content-header-btn-dots"></div>
                    <div class="modalbox-detail-content-header-btn-select">
                        <div class="modalbox-detail-content-header-btn-select-angle"></div>
                        <div class="block-body-content-table-item-option-select-list">
                            <div class="block-body-content-table-item-option-select-item">Edit</div>
                            <div class="block-body-content-table-item-option-select-item">Log</div>
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
                    <div class="modalbox-detail-content-item-title">Title</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.display_name">
                        {{ data.display_name }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Url</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.active_path.replace('%', '').trim() !== ''">
                        {{ data.active_path.trim().replace('%', '') }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Method</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.display_method">
                        {{ data.display_method }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Params</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.display_param">
                        {{ data.display_param }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Added</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dt">
                        {{ data.dt }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Type</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.rawbase_type">
                        {{ data.rawbase_type }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Scanner</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.service">
                        {{ data.service }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Status</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.status">
                        {{ data.status }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Scan ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.scan">
                        {{ data.scan }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Process ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.process">
                        {{ data.process }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">JIT report</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.jitreport">
                        {{ data.jitreport }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Comment</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-links" v-if="data.comment">
                        <template v-if="isCutText">
                            <template v-if="!showFullDetails">
                                <div class="modalbox-detail-content-item-value-pre" v-html="findUrl(cutDetails)"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullDetails = true">Show full details</div>
                            </template>
                            <template v-else>
                                <div class="modalbox-detail-content-item-value-pre" v-html="findUrl(data.comment)"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullDetails = false">Hide</div>
                            </template>
                        </template>
                        <div v-else class="modalbox-detail-content-item-value-pre" v-html="findUrl(data.comment)"></div>
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item modalbox-detail-content-item-object" v-if="data.scanProcess">
                    <div class="modalbox-detail-content-item-title">
                        Scan process
                    </div>
                    <div class="modalbox-detail-content-item-list">
                        <div class="modalbox-detail-content-item-list-info" @click="checkSelected(data.scanProcess.id)">
                            Scan process <span>#{{ data.scanProcess.id }}</span>
                            <div class="block-body-left-item-icon-arr" :class="{'modalbox-detail-content-item-list-arr':projsofts.includes(data.scanProcess.id)}"></div>
                        </div>
                        <div class="modalbox-detail-content-item-list-details" :class="{'modalbox-detail-content-item-list-details-hide':!projsofts.includes(data.scanProcess.id)}">
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.scanProcess.id">{{ data.scanProcess.id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Project ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <NuxtLink v-if="data.scanProcess.project_id" :to="'/dashboard/' + data.scanProcess.project_id">{{ data.scanProcess.project_id }}</NuxtLink>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">PID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.scanProcess.pid">{{ data.scanProcess.pid }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Scan ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.scanProcess.scan_id">{{ data.scanProcess.scan_id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Target url</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.scanProcess.target_url"><a :href="data.scanProcess.target_url" target="_blank">{{ data.scanProcess.target_url }}</a></template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Params</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.scanProcess.params">{{ data.scanProcess.params }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Server</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.scanProcess.server">{{ data.scanProcess.server }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Service</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.scanProcess.service">{{ data.scanProcess.service }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Zombie alert</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.scanProcess.zombie_alert">{{ data.scanProcess.zombie_alert }}</template>
                                    <template v-else>-</template>
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
    name: "projectUnverifiedDetail",
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
            if (this.data && this.data.comment) {
                let size = this.data.comment.trim().length;
                if (size > this.detailSize) {
                    cut = true;
                }
            }
            return cut;
        },
        cutDetails() {
            let text = '';
            if (this.data && this.data.comment) {
                text = this.data.comment.slice(0, this.detailSize);
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

<style scoped>

</style>