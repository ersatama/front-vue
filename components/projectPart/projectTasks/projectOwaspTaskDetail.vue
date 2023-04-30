<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Tasks
                </div>
                <div class="modalbox-detail-content-header-detail-desc">
                    Owasp task V{{ data[0][0] }}.{{ data[1][0] }}
                </div>
            </div>
            <div class="modalbox-detail-content-header-btns">
                <div class="modalbox-detail-content-header-btn">
                    <div class="modalbox-detail-content-header-btn-dots"></div>
                    <div class="modalbox-detail-content-header-btn-select">
                        <div class="modalbox-detail-content-header-btn-select-angle"></div>
                        <div class="block-body-content-table-item-option-select-list">
                            <div class="block-body-content-table-item-option-select-item">Close task</div>
                            <div class="block-body-content-table-item-option-select-item">Close all tasks</div>
                        </div>
                    </div>
                </div>
                <div class="modalbox-detail-content-header-btn modalbox-detail-content-header-btn-close" @click="$emit('closeModal');"></div>
            </div>
        </div>
        <vue-custom-scrollbar class="modalbox-detail-content-scroll"  :settings="settings">
            <div class="modalbox-detail-content-body">
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Version</div>
                    <div class="modalbox-detail-content-item-value">V{{ data[0][0] }}.{{ data[1][0] }}</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Name</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1][1].blockName">
                        {{ data[1][1].blockName }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Done</div>
                    <div class="modalbox-detail-content-item-value">
                        {{ data[1][1].done }} / {{ Object.entries(data[1][1].elements).length }}
                    </div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Owner</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[0][1].owner">
                        {{ data[0][1].owner }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">ASVS type</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1][1].svs_type">
                        {{ data[0][1].svs_type }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Opened</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1][1].opened">true</div>
                    <div class="modalbox-detail-content-item-value" v-else>false</div>
                </div>
                <div class="modalbox-detail-content-item modalbox-detail-content-item-object">
                    <div class="modalbox-detail-content-item-title" onselectstart="return false">
                        Task elements
                        <span v-if="data[1][1].elements && Object.entries(data[1][1].elements).length > 0"> - {{ Object.entries(data[1][1].elements).length }}</span>
                    </div>
                    <div class="modalbox-detail-content-item-list" v-for="(item,key) in data[1][1].elements" :key="key">
                        <div class="modalbox-detail-content-item-list-info" @click="checkSelectedTask(item.task.id)">
                            Task <span>#{{ item.task.id }}</span>
                            <div class="block-body-left-item-icon-arr" :class="{'modalbox-detail-content-item-list-arr':selectedTasks.includes(item.task.id)}"></div>
                        </div>
                        <div class="modalbox-detail-content-item-list-details" :class="{'modalbox-detail-content-item-list-details-hide':!selectedTasks.includes(item.task.id)}">
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.task.id">{{ item.task.id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Project ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <NuxtLink v-if="item.task.project_id" :to="'/dashboard/' + item.task.project_id">{{ item.task.project_id }}</NuxtLink>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Name</div>
                                <div class="modalbox-detail-content-item-list-view-value modalbox-detail-content-item-list-view-value-pre">
                                    <template v-if="item.task.task_name">{{item.task.task_name}}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Type</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.task.task_type">{{ item.task.task_type }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Global type</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.task.global_task_type">{{ item.task.global_task_type }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Auditor</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.task.auditor">{{ item.task.auditor }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Datetime</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.task.task_dt">{{ item.task.task_dt }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Closed by</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.task.closed_by">{{ item.task.closed_by }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Closed at</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.task.closed_at">{{ item.task.closed_at }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modalbox-detail-content-item modalbox-detail-content-item-object">
                    <div class="modalbox-detail-content-item-title" onselectstart="return false">
                        Owasp task elements
                        <span v-if="data[1][1].elements && Object.entries(data[1][1].elements).length > 0"> - {{ Object.entries(data[1][1].elements).length }}</span>
                    </div>
                    <div class="modalbox-detail-content-item-list" v-for="(item,key) in data[1][1].elements" :key="key">
                        <div class="modalbox-detail-content-item-list-info" @click="checkSelectedOwaspTask(item.owasp.id)">
                            Task <span>#{{ item.owasp.id }}</span>
                            <div class="block-body-left-item-icon-arr" :class="{'modalbox-detail-content-item-list-arr':selectedOwaspTasks.includes(item.owasp.id)}"></div>
                        </div>
                        <div class="modalbox-detail-content-item-list-details" :class="{'modalbox-detail-content-item-list-details-hide':!selectedOwaspTasks.includes(item.owasp.id)}">
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.id">{{ item.owasp.id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">SVS type</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.svs_type">{{ item.owasp.svs_type }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Chapter ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.chapter_id">{{ item.owasp.chapter_id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Name</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.chapter_name">{{ item.owasp.chapter_name }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Req ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.req_id">{{ item.owasp.req_id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Req description</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.req_description">{{ item.owasp.req_description }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Section ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.section_id">{{ item.owasp.section_id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Section Name</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.section_name">{{ item.owasp.section_name }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Text</div>
                                <div class="modalbox-detail-content-item-list-view-value modalbox-detail-content-item-list-view-value-pre">
                                    <template v-if="item.owasp.text">{{ item.owasp.text }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">CWE</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.cwe">{{ item.owasp.cwe }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">L1</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.L1">{{ item.owasp.L1 }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">L1</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.L1">{{ item.owasp.L1 }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">L2</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.L2">{{ item.owasp.L2 }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">R</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.R">{{ item.owasp.R }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Nist</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="item.owasp.nist">{{ item.owasp.nist }}</template>
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
    name: "projectOwaspTaskDetail",
    props: ['data'],
    components: { vueCustomScrollbar },
    data() {
        return {
            selectedTasks: [],
            selectedOwaspTasks: [],
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
        checkSelectedTask(id) {
            if (this.selectedTasks.includes(id)) {
                let index = this.selectedTasks.indexOf(id);
                if (index !== -1) {
                    this.selectedTasks.splice(index, 1);
                }
            } else {
                this.selectedTasks.push(id);
            }
        },
        checkSelectedOwaspTask(id) {
            if (this.selectedOwaspTasks.includes(id)) {
                let index = this.selectedOwaspTasks.indexOf(id);
                if (index !== -1) {
                    this.selectedOwaspTasks.splice(index, 1);
                }
            } else {
                this.selectedOwaspTasks.push(id);
            }
        },
        con(data) {
            console.log(data);
            return data;
        }
    }
}
</script>

<style>

</style>