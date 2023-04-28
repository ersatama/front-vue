<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Draft
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
                            <div class="block-body-content-table-item-option-select-item">Delete</div>
                            <div class="block-body-content-table-item-option-select-item">Log</div>
                            <div class="block-body-content-table-item-option-select-item">Source raw reports</div>
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
                    <div class="modalbox-detail-content-item-title">Raw ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.rawid">
                        {{ data.rawid }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Target ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.target_id">
                        {{ data.target_id }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Status</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.draft">
                        {{ data.draft }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Title</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.title">
                        {{ data.title }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Category</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.category">
                        {{ data.category }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Code type</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.codetype">
                        {{ data.codetype }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">CWE-ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.cwe">
                        {{ data.cwe }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">ASVS</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.asvs">
                        {{ data.asvs }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">CVSS</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.category">
                        {{ data.category }} <template v-if="data.cvss">/ {{ data.cvss }}</template>
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Method</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.method">
                        {{ data.method }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Parameters</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.param">
                        {{ data.param }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Poc</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.poc">
                        {{ data.poc }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Script</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.script" v-html="findUrl(data.script)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Created by</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.source">
                        {{ data.source }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Added on</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dt_add">
                        {{ data.dt_add }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Bitrix task</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.bitrix_task">
                        {{ data.bitrix_task }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Modified by</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.lastModifiedBy && data.lastModifiedBy.value">
                        {{ data.lastModifiedBy.value }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Last modified time</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.lastModifiedTime && data.lastModifiedTime.value">
                        {{ data.lastModifiedTime.value }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Added</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dt_add">
                        {{ data.dt_add }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Detected</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dt_detect">
                        {{ data.dt_detect }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Fixed</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dt_fixed">
                        {{ data.dt_fixed }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Checked</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dt_fixchk">
                        {{ data.dt_fixchk }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Ignored</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dt_ignore">
                        {{ data.dt_ignore }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Fixed by waf</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.fixedbywaf">
                        {{ data.fixedbywaf }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Internal alert</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.internalalert">
                        {{ data.internalalert }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Body</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-links" v-if="data.body">
                        <template v-if="isCutText">
                            <template v-if="!showFullDetails">
                                <div class="modalbox-detail-content-item-value-pre" v-html="findUrl(cutDetails)"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullDetails = true">Show full text</div>
                            </template>
                            <template v-else>
                                <div class="modalbox-detail-content-item-value-pre" v-html="findUrl(data.body)"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullDetails = false">Hide</div>
                            </template>
                        </template>
                        <div v-else class="modalbox-detail-content-item-value-pre" v-html="findUrl(data.body)"></div>
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Remed</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-links" v-if="data.remed">
                        <template v-if="isCutTextRemed">
                            <template v-if="!showFullRemed">
                                <div class="modalbox-detail-content-item-value-pre" v-html="cutRemed"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullRemed = true">Show full text</div>
                            </template>
                            <template v-else>
                                <div class="modalbox-detail-content-item-value-pre" v-html="data.remed"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullRemed = false">Hide</div>
                            </template>
                        </template>
                        <div v-else class="modalbox-detail-content-item-value-pre" v-html="data.remed"></div>
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Vuln description</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-links" v-if="data.vulndescr">
                        <template v-if="isCutTextVuln">
                            <template v-if="!showFullVuln">
                                <div class="modalbox-detail-content-item-value-pre" v-html="cutVuln"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullVuln = true">Show full text</div>
                            </template>
                            <template v-else>
                                <div class="modalbox-detail-content-item-value-pre" v-html="data.vulndescr"></div>
                                <div class="modalbox-detail-content-item-btn" onselectstart="return false" @click="showFullVuln = false">Hide</div>
                            </template>
                        </template>
                        <div v-else class="modalbox-detail-content-item-value-pre" v-html="data.vulndescr"></div>
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
            </div>
        </vue-custom-scrollbar>
    </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
    name: "projectDraftDetail",
    props: ['data'],
    components: { vueCustomScrollbar },
    data() {
        return {
            drafts: [],
            showFullDetails: false,
            showFullRemed: false,
            showFullVuln: false,
            detailSize: 300,
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
            }
        }
    },
    computed: {
        isCutTextVuln() {
            let cut = false;
            if (this.data && this.data.vulndescr) {
                let size = this.data.vulndescr.trim().length;
                if (size > this.detailSize) {
                    cut = true;
                }
            }
            return cut;
        },
        cutVuln() {
            let text = '';
            if (this.data && this.data.vulndescr) {
                text = this.data.vulndescr.trim().slice(0, this.detailSize);
                text += ' ...';
            }
            return text;
        },
        isCutTextRemed() {
            let cut = false;
            if (this.data && this.data.remed) {
                let size = this.data.remed.trim().length;
                if (size > this.detailSize) {
                    cut = true;
                }
            }
            return cut;
        },
        cutRemed() {
            let text = '';
            if (this.data && this.data.remed) {
                text = this.data.remed.trim().slice(0, this.detailSize);
                text += ' ...';
            }
            return text;
        },
        isCutText() {
            let cut = false;
            if (this.data && this.data.body) {
                let size = this.data.body.trim().length;
                if (size > this.detailSize) {
                    cut = true;
                }
            }
            return cut;
        },
        cutDetails() {
            let text = '';
            if (this.data && this.data.body) {
                text = this.data.body.trim().slice(0, this.detailSize);
                text += ' ...';
            }
            return text;
        },
    },
    methods: {
        findUrl(text) {
            let urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.toString().replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            })
        },
        checkSelected(id) {
            if (this.drafts.includes(id)) {
                let index = this.drafts.indexOf(id);
                if (index !== -1) {
                    this.drafts.splice(index, 1);
                }
            } else {
                this.drafts.push(id);
            }
        },
    }
}
</script>

<style scoped>

</style>