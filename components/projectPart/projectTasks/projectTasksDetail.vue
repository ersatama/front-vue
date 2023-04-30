<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Tasks
                </div>
                <div class="modalbox-detail-content-header-detail-desc">
                    Project task #{{ data.id }}
                </div>
            </div>
            <div class="modalbox-detail-content-header-btns">
                <div class="modalbox-detail-content-header-btn">
                    <div class="modalbox-detail-content-header-btn-dots"></div>
                    <div class="modalbox-detail-content-header-btn-select">
                        <div class="modalbox-detail-content-header-btn-select-angle"></div>
                        <div class="block-body-content-table-item-option-select-list">
                            <div class="block-body-content-table-item-option-select-item">Close</div>
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
                    <div class="modalbox-detail-content-item-title">Status</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.status">
                        {{ data.status }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Task ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.task_id">
                        {{ data.task_id }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Task type</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.task_type">
                        {{ data.task_type }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Global task type</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.global_task_type">
                        {{ data.global_task_type }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Date</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.task_dt">
                        {{ data.task_dt }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Closed by</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.closed_by">
                        {{ data.closed_by }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Closed at</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.closed_at">
                        {{ data.closed_at }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Task</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.task_name">
                        {{ data.task_name }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Auditor</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.auditor">
                        {{ data.auditor }}
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
    name: "projectTasksDetail",
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
}
</script>

<style>

</style>