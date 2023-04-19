<template>
  <div style="width: 100%;">
      <div class="block-body-content-table">
          <div class="block-body-content-table-header">
              <div class="block-body-content-table-tr">
                  <div class="block-body-content-table-item block-body-content-table-item-date">Date</div>
                  <div class="block-body-content-table-item block-body-content-table-item">Task</div>
                  <div class="block-body-content-table-item block-body-content-table-item-engine">Auditor</div>
                  <div class="block-body-content-table-item block-body-content-table-item-field-option">
                      <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                  </div>
              </div>
          </div>
          <div class="block-body-content-table-body">
              <template v-if="projectTasks.length > 0">
                  <div class="block-body-content-table-tr" v-for="(projectTask, key) in projectTasks" :key="key">
                      <div class="block-body-content-table-item block-body-content-table-item-date">{{ projectTask.task_dt }}</div>
                      <div class="block-body-content-table-item block-body-content-table-item">{{ projectTask.task_name }}</div>
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
              </template>
              <template v-else>
                  <div class="block-body-content-table-body-empty">No data</div>
              </template>
          </div>
      </div>
      <div class="block-body-right-header">
          <div class="block-body-right-title">ASVS TASKS</div>
          <div class="block-body-right-desc">List of asvs tasks</div>
      </div>
      <div class="block-body-content-table">
          <div class="block-body-content-table-body">
              <template v-if="projectTasks.length > 0">
                  <div class="block-body-content-table-tr-dropdown" v-for="(owaspTask, key) in owaspTasks" :key="key">
                      <div class="block-body-content-table-tr" @click="showOwaspTask(key)">
                          <div class="block-body-content-table-item block-body-content-table-item-id">V{{ owaspTask[0] }}</div>
                          <div class="block-body-content-table-item block-body-content-table-item">{{ owaspTask[1].blockName }}</div>
                          <div class="block-body-content-table-item block-body-content-table-item-engine">{{ owaspTask[1].done }} / {{ owaspTask[1].elements_count }}</div>
                          <div class="block-body-content-table-item block-body-content-table-item-engine">{{ owaspTask[1].owner }}</div>
                          <div class="block-body-content-table-item block-body-content-table-item-sel">
                              <template v-if="tasks.assign === 0">No access to assign auditor tasks</template>
                              <template v-else-if="tasks.auditors.hasOwnProperty(portalProject.id)">
                                  <select>
                                      <option selected disabled>Select auditor to assign</option>
                                      <option v-for="(auditor, key) in tasks.auditors[portalProject.id]" :key="key" value="auditor">{{auditor}}</option>
                                  </select>
                                  <button>Assign tasks</button>
                              </template>
                          </div>
                          <div class="block-body-content-table-item block-body-content-table-item-field-option">
                              <div class="block-body-content-table-item-option">
                                  <div class="block-body-content-table-item-option-select">
                                      <div class="block-body-content-table-item-option-select-angle"></div>
                                      <div class="block-body-content-table-item-option-select-list">
                                          <div class="block-body-content-table-item-option-select-item">Close all chapter tasks</div>
                                      </div>
                                  </div>
                                  <div class="block-body-content-table-item-option-dots"></div>
                              </div>
                          </div>
                      </div>
                      <div class="block-body-content-table-tr-dropdown-content" v-show="show.includes(key)">
                          <div class="block-body-content-table-tr" v-for="(element, elementKey) in Object.entries(owaspTask[1].elements)" :key="elementKey">
                              <div class="block-body-content-table-item block-body-content-table-item-arrow"></div>
                              <div class="block-body-content-table-item block-body-content-table-item-id">V{{ owaspTask[0] }}.{{ element[0] }}</div>
                              <div class="block-body-content-table-item block-body-content-table-item">{{ element[1].blockName }}</div>
                              <div class="block-body-content-table-item block-body-content-table-item-engine">{{ element[1].done }} / {{ Object.entries(element[1].elements).length }}</div>
                              <div class="block-body-content-table-item block-body-content-table-item-engine">{{ owaspTask[1].owner }}</div>
                              <div class="block-body-content-table-item block-body-content-table-item-sel"></div>
                              <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                  <div class="block-body-content-table-item-option">
                                      <div class="block-body-content-table-item-option-select">
                                          <div class="block-body-content-table-item-option-select-angle"></div>
                                          <div class="block-body-content-table-item-option-select-list">
                                              <div class="block-body-content-table-item-option-select-item">Close all chapter tasks</div>
                                          </div>
                                      </div>
                                      <div class="block-body-content-table-item-option-dots"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </template>
              <template v-else>
                  <div class="block-body-content-table-body-empty">No data</div>
              </template>

          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "projectTasks",
    props: ['portalProject'],
    data() {
        return {
            tasks: null,
            show: []
        }
    },
    created() {
        this.getTasksByProjectId();
    },
    computed: {
        user() {
            return this.$store.state.localStorage.user;
        },
        projectTasks() {
            let projectTasks = [];
            if (this.tasks) {
                let projects    =   Object.entries(this.tasks.tasks.tasks);
                if (projects.length > 0 && projects[0].length > 1) {
                    projectTasks    =   projects[0][1];
                }
            }
            return projectTasks;
        },
        owaspTasks() {
            let owaspTasks = [];
            if (this.tasks) {
                let projects    =   Object.entries(this.tasks.tasks.owaspTasks);
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
        async getTasksByProjectId() {
            if (this.portalProject && this.user) {
                let tasks = await this.$store.dispatch('localStorage/portalProject_tasksByIdAndAuditorId', {
                    id: this.portalProject.id,
                    auditor_id: this.user.auditor_id
                });
                if (tasks.data) {
                    this.tasks  = tasks.data;
                }
            }
        }
    }
}
</script>

<style lang="scss">

</style>