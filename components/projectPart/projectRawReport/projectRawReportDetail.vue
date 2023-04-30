<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Raw report
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
                    <div class="modalbox-detail-content-item-title">Process</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.process">
                        {{ data.process }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Scan</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.scan">
                        {{ data.scan }}
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
                    <div class="modalbox-detail-content-item-title">Service</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.service">
                        {{ data.service }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Name</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.name">
                        {{ data.name }}
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
                    <div class="modalbox-detail-content-item-title">Rawbase</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.rawbase">
                        DRAFT
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>NO DRAFT</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Code type</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.codetype">
                        {{ data.codetype }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Cluster</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.cluster">
                        {{ data.cluster }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Cluster 2</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.cluster2">
                        {{ data.cluster2 }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Cluster 3</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.cluster3">
                        {{ data.cluster3 }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">JSON</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.json">
                        {{ data.json }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">AI status</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.aiStatus">
                        {{ data.aiStatus }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Crit</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.crit">
                        {{ data.crit }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">CVSS</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.cvss">
                        {{ data.cvss }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Create date</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dtcreate">
                        {{ data.dtcreate }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Update date</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dtupdate">
                        {{ data.dtupdate }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Status update date</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.dtstatusupdate">
                        {{ data.dtstatusupdate }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Http status</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.httpstatus">
                        {{ data.httpstatus }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Map</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.map">
                        {{ data.map }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Possible</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.possible">
                        {{ data.possible }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Request url</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.request_url">
                        {{ data.request_url }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Request method</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.request_method">
                        {{ data.request_method }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Request headers</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.request_headers">
                        {{ data.request_headers }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Request body</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.request_body">
                        {{ data.request_body }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Response headers</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.response_headers">
                        {{ data.response_headers }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Response body</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.response_body">
                        {{ data.response_body }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Response time</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.response_time">
                        {{ data.response_time }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Smart eval</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.smarteval">
                        {{ data.smarteval }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Smart eval</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.smarteval2">
                        {{ data.smarteval2 }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Smart eval</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.smarteval3">
                        {{ data.smarteval3 }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">VComments</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-value-pre" v-if="data.vcomments" v-html="findUrl(data.vcomments)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">VHtml</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.vhtml" v-html="findUrl(data.vhtml)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Vparams</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-value-pre" v-if="data.vparams" v-html="findUrl(data.vparams)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Vparamtype</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-value-pre" v-if="data.vparamtype" v-html="findUrl(data.vparamtype)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Vpoc</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-value-pre" v-if="data.vpoc" v-html="findUrl(data.vpoc)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">VScript</div>
                    <div class="modalbox-detail-content-item-value modalbox-detail-content-item-value-pre" v-if="data.vscript" v-html="findUrl(data.vscript)"></div>
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
    name: "projectRawReportDetail",
    props: ['data'],
    components: { vueCustomScrollbar },
    data() {
        return {
            list: [],
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
    methods: {
        findUrl(text) {
            let urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.toString().replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            })
        },
    }
}
</script>

<style>

</style>