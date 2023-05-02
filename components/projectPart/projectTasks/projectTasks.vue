<template>
    <div class="block-body-right" >
        <modal-detail :show="projectTaskDetail" @closeModal="projectTaskDetail = false">
            <project-tasks-detail  v-if="projectTask" :data="projectTask" @closeModal="projectTaskDetail = false"></project-tasks-detail>
        </modal-detail>
        <modal-detail :show="owaspTaskDetail" @closeModal="owaspTaskDetail = false">
            <project-owasp-task-detail v-if="owaspTask" :data="owaspTask" @closeModal="owaspTaskDetail = false"></project-owasp-task-detail>
        </modal-detail>
        <div class="block-body-right-header">
            <div class="block-body-right-title">Tasks</div>
            <div class="block-body-right-desc">Project tasks</div>
        </div>
        <div class="block-body-content">
            <div style="width: 100%;">
                <template v-if="list">
                    <div class="block-body-content-table">
                        <template v-if="projectTasks.length > 0">
                            <div class="block-body-content-table-header">
                                <div class="block-body-content-table-tr">
                                    <div class="block-body-content-table-item block-body-content-table-item-date">Date</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-longcomment">Task</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-engine">Auditor</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                        <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="block-body-content-table-body">
                                <div class="block-body-content-table-tr" v-for="(projectTask, key) in projectTasks" :key="key" @click.stop="showProjectTaskDetailInfo(projectTask)" @mousedown.stop>
                                    <div class="block-body-content-table-item block-body-content-table-item-date">{{ projectTask.task_dt }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-longcomment">{{ projectTask.task_name }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-engine">{{ projectTask.auditor }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                        <div class="block-body-content-table-item-option">
                                            <div class="block-body-content-table-item-option-select">
                                                <div class="block-body-content-table-item-option-select-angle"></div>
                                                <div class="block-body-content-table-item-option-select-list">
                                                    <div class="block-body-content-table-item-option-select-item">Close</div>
                                                </div>
                                            </div>
                                            <div class="block-body-content-table-item-option-dots"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <project-no-data v-else></project-no-data>
                    </div>
                    <div class="block-body-right-header">
                        <div class="block-body-right-title">ASVS TASKS</div>
                        <div class="block-body-right-desc">List of asvs tasks</div>
                    </div>
                    <div class="block-body-content-table">
                        <div class="block-body-content-table-body" v-if="owaspTasks.length > 0">
                            <div class="block-body-content-table-tr-dropdown" v-for="(owaspTask, key) in owaspTasks" :key="key">
                                <div class="block-body-content-table-tr" @click="showOwaspTask(key)">
                                    <div class="block-body-content-table-item block-body-content-table-item-id">V{{ owaspTask[0] }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-mediumtext">{{ owaspTask[1].blockName }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-engine">{{ owaspTask[1].done }} / {{ owaspTask[1].elements_count }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-engine">{{ owaspTask[1].owner }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-sel">
                                        <template v-if="list.assign === 0">No access to assign auditor tasks</template>
                                        <template v-else-if="list.auditors.hasOwnProperty(portalProject.id)">
                                            <select>
                                                <option selected disabled>Select auditor to assign</option>
                                                <option v-for="(auditor, key) in list.auditors[portalProject.id]" :key="key" value="auditor">{{auditor}}</option>
                                            </select>
                                            <button>Assign tasks</button>
                                        </template>
                                    </div>
                                    <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                        <div class="block-body-content-table-item-option">
                                            <div class="block-body-content-table-item-option-select">
                                                <div class="block-body-content-table-item-option-select-angle"></div>
                                                <div class="block-body-content-table-item-option-select-list">
                                                    <div class="block-body-content-table-item-option-select-item">Close all tasks</div>
                                                </div>
                                            </div>
                                            <div class="block-body-content-table-item-option-dots"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="block-body-content-table-tr-dropdown-content" v-show="show.includes(key)">
                                    <div class="block-body-content-table-tr" v-for="(element, elementKey) in Object.entries(owaspTask[1].elements)" :key="elementKey"  @click.stop="showOwaspTaskDetailInfo([owaspTask, element])" @mousedown.stop>
                                        <div class="block-body-content-table-item block-body-content-table-item-arrow"></div>
                                        <div class="block-body-content-table-item block-body-content-table-item-id-short-65">V{{ owaspTask[0] }}.{{ element[0] }}</div>
                                        <div class="block-body-content-table-item block-body-content-table-item-mediumtext">{{ element[1].blockName }}</div>
                                        <div class="block-body-content-table-item block-body-content-table-item-engine">{{ element[1].done }} / {{ Object.entries(element[1].elements).length }}</div>
                                        <div class="block-body-content-table-item block-body-content-table-item-engine">{{ owaspTask[1].owner }}</div>
                                        <div class="block-body-content-table-item block-body-content-table-item-sel"></div>
                                        <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                            <div class="block-body-content-table-item-option">
                                                <div class="block-body-content-table-item-option-select">
                                                    <div class="block-body-content-table-item-option-select-angle"></div>
                                                    <div class="block-body-content-table-item-option-select-list">
                                                        <div class="block-body-content-table-item-option-select-item">Close task</div>
                                                        <div class="block-body-content-table-item-option-select-item">Close all tasks</div>
                                                    </div>
                                                </div>
                                                <div class="block-body-content-table-item-option-dots"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <project-no-data v-else></project-no-data>
                    </div>
                </template>
                <project-part-loading v-else></project-part-loading>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectPartLoading from "../../modal/projectPartLoading.vue";
import ProjectNoData from "../projectNoData.vue";
import ModalDetail from "../../modal/modalDetail.vue";
import ProjectTasksDetail from "./projectTasksDetail.vue";
import ProjectRawbaseDetail from "../projectRawbase/projectRawbaseDetail.vue";
import ProjectOwaspTaskDetail from "./projectOwaspTaskDetail.vue";

export default {
    name: "projectTasks",
    components: {
        ProjectOwaspTaskDetail,
        ProjectRawbaseDetail, ProjectTasksDetail, ModalDetail, ProjectNoData, ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            list: null,
            show: [],
            projectTask: null,
            projectTaskDetail: false,
            owaspTask: null,
            owaspTaskDetail: false,
        }
    },
    created() {
        this.getList();
    },
    computed: {
        user() {
            return this.$store.state.localStorage.user;
        },
        projectTasks() {
            let projectTasks = [];
            if (this.list) {
                let projects    =   Object.entries(this.list.tasks.tasks);
                if (projects.length > 0 && projects[0].length > 1) {
                    projectTasks    =   projects[0][1];
                }
            }
            return projectTasks;
        },
        owaspTasks() {
            let owaspTasks = [];
            if (this.list) {
                let projects    =   Object.entries(this.list.tasks.owaspTasks);
                if (projects.length > 0 && projects[0].length > 1) {
                    let sortedOwaspTasks    =   Object.entries(projects[0][1]);
                    sortedOwaspTasks.forEach(sortedOwaspTask => {
                        Object.entries(sortedOwaspTask[1]).forEach(item => {
                            owaspTasks.push(item);
                        });
                    });
                }
            }
            return owaspTasks;
        }
    },
    methods: {
        showProjectTaskDetailInfo(data) {
            this.projectTask        =   data;
            this.projectTaskDetail  =   true;
        },
        showOwaspTaskDetailInfo(data) {
            this.owaspTask          =   data;
            this.owaspTaskDetail    =   true;
        },
        showOwaspTask(key) {
            if (this.show.includes(key)) {
                let index   =   this.show.indexOf(key);
                if (index !== -1) {
                    this.show.splice(index, 1);
                }
            } else {
                this.show.push(key);
            }
        },
        async getList() {
            if (this.portalProject && this.user) {

                let list = await this.$store.dispatch('localStorage/auditorTask_getWhere', {
                    project_id: this.portalProject.id,
                    auditor_id: this.user.auditor_id,
                    user: this.user.auditor.user,
                    orderBy: 'task_dt',
                    orderByType: 'desc'
                });
                if (list.data) {
                    this.list  = list.data;
                }
            }
        }
    }
}
</script>

<style lang="scss">

</style>