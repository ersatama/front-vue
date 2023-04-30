<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Neuron Scan job
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
                            <div class="block-body-content-table-item-option-select-item">Start</div>
                            <div class="block-body-content-table-item-option-select-item">Edit</div>
                            <div class="block-body-content-table-item-option-select-item">Delete</div>
                            <div class="block-body-content-table-item-option-select-item">Add authscript</div>
                        </div>
                    </div>
                </div>
                <div class="modalbox-detail-content-header-btn modalbox-detail-content-header-btn-close" @click="$emit('closeModal');"></div>
            </div>
        </div>
        <vue-custom-scrollbar class="modalbox-detail-content-scroll" :settings="settings">
            <div class="modalbox-detail-content-body">
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.id">{{ data.id }}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Neuron targets ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.neuron_targets_id">{{ data.neuron_targets_id }}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Project ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.project_id">{{ data.project_id }}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Target URL</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.target_url" v-html="findUrl(data.target_url)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Host</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.host">{{data.host}}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Command</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.command">{{data.command}}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Status</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.status">{{data.status}}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Manual</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.manual">{{data.manual}}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Start time</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.starttime">{{data.starttime}}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">End time</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.endtime">{{data.endtime}}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Owner</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.owner">{{data.owner}}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Comment</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.comment" v-html="findUrl(data.comment)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item modalbox-detail-content-item-object">
                    <div class="modalbox-detail-content-item-title">
                        Scan Engine and Config
                        <span v-if="data.services_json && Object.entries(services).length > 0"> - {{ Object.entries(services).length }}</span>
                    </div>
                    <div class="modalbox-detail-content-item-list" v-for="(service,key) in Object.entries(services)" :key="key">
                        <div class="modalbox-detail-content-item-list-info" @click="check(service[0])">
                            {{ service[0] }}
                            <div class="block-body-left-item-icon-arr" :class="{'modalbox-detail-content-item-list-arr':list.includes(service[0])}"></div>
                        </div>
                        <div class="modalbox-detail-content-item-list-details" :class="{'modalbox-detail-content-item-list-details-hide':!list.includes(service[0])}">
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Mode</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="service[1].mode">{{ service[1].mode }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">End time</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="service[1].endtime">{{ service[1].endtime }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Headers</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="service[1].headers">{{ service[1].headers }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Idle time</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="service[1].IdleTime">{{ service[1].IdleTime }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Scan area</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="service[1].ScanArea">{{ service[1].ScanArea }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Scan speed</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="service[1].scanspeed">{{ service[1].scanspeed }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Scan aggressivity</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="service[1].scanaggressivity">{{ service[1].scanaggressivity }}</template>
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
    name: "projectNeuronScanJobsDetail",
    props: ['data'],
    components: { vueCustomScrollbar },
    data() {
        return {
            list: [],
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
        services() {
            let services    =   {};
            if (this.data && this.data.services_json) {
                services    =   JSON.parse(this.data.services_json);
            }
            return services;
        }
    },
    methods: {
        findUrl(text) {
            let urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.toString().replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            })
        },
        check(id) {
            if (this.list.includes(id)) {
                let index = this.list.indexOf(id);
                if (index !== -1) {
                    this.list.splice(index, 1);
                }
            } else {
                this.list.push(id);
            }
        },
    }
}
</script>

<style>

</style>