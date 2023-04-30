<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Scan job
                </div>
                <div class="modalbox-detail-content-header-detail-desc">
                    #{{ data[0] }}
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
                    <div class="modalbox-detail-content-item-value">{{ data[0] }}</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Url</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].target_url" v-html="findUrl(data[1].target_url)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Scan engine & config</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].services" style="color: #0b76a6; font-weight: 600;" v-html="parseServices(data[1].services)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Status</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].status" v-html="findUrl(data[1].status)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Comment</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].comment" v-html="findUrl(data[1].comment)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Start date</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].starttime">{{ data[1].starttime }}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">End date</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].endtime">{{ data[1].endtime }}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Period</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].period">{{ data[1].period }}</div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Has last modified processes <span v-if="data[1].processes.length >0">- {{data[1].processes.length}}</span></div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].hasLastModifiedProcesses">true</div>
                    <div class="modalbox-detail-content-item-value" v-else>false</div>
                </div>
            </div>
        </vue-custom-scrollbar>
    </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
    name: "projectScanJobsDetail",
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
    methods: {
        findUrl(text) {
            let urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.toString().replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            })
        },
        parseServices(services) {
            let parsedServices  = services.split(',');
            let result  = parsedServices.map(item => {
                let val = item.replace(/ *\([^)]*\) */g, '');
                if (val === 'START') {
                    return 'START (virtual)';
                } else if (val === 'STOP') {
                    return 'STOP (virtual)'
                }
                return val;
            });
            result = [...new Set(result)];
            let parsedHtml = '';
            if (result.length > 1) {
                result.forEach(item => {
                    parsedHtml  += item + '<br>';
                });
            } else {
                parsedHtml  = result[0];
            }
            return parsedHtml;
        }
    }
}
</script>

<style>

</style>