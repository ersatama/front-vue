<template>
    <div class="item-body-right">
        <template v-if="list">
            <div class="item-body-right-table" v-if="list.length > 0">
                <div class="item-body-right-table-header">
                    <div class="item-body-right-table-item">Title</div>
                    <div class="item-body-right-table-item">CWE-ID</div>
                    <div class="item-body-right-table-item">Risk Level</div>
                    <div class="item-body-right-table-item">Action</div>
                </div>
                <div class="item-body-right-table-body">
                    <div v-for="(item, key) in list" :key="key" :class="{'item-body-right-table-item-medium':(item.category === 'MEDIUM'),'item-body-right-table-item-critical':(item.category === 'CRITICAL'),'item-body-right-table-item-warning':(item.category === 'WARNING'),'item-body-right-table-item-low':(item.category === 'LOW'),'item-body-right-table-item-high':(item.category === 'HIGH')}">
                        <div class="item-body-right-table-item">{{ item.title }}</div>
                        <div class="item-body-right-table-item">{{ item.cwe }}</div>
                        <div class="item-body-right-table-item">
                            <template v-if="item.cwe && item.cwe !== 'MAIN_WARNING'">
                                {{ warn(item.cvss) }}
                            </template>
                            {{ item.category }}
                        </div>
                        <div class="item-body-right-table-item">
                            <div class="item-body-right-table-item-option">
                                <div class="item-body-right-table-item-option-list">
                                    <div class="item-body-right-table-item-option-list-angle"></div>
                                    <div class="item-body-right-table-item-option-list-select">
                                        <div class="item-body-right-table-item-option-list-select-item">Edit</div>
                                        <div class="item-body-right-table-item-option-list-select-item">Delete</div>
                                        <div class="item-body-right-table-item-option-list-select-item">Log</div>
                                    </div>
                                </div>
                                <div class="item-body-right-table-item-option-dots"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-body-left-table" v-else>
                <div class="item-body-left-table-body">
                    <div class="item-body-right-table-body-empty text-muted">No vulns</div>
                </div>
            </div>
        </template>
        <div class="block-dashboard-loading-left-item-body" v-else>
            <div class="block-loading-item-field"></div>
            <div class="block-loading-item-field"></div>
            <div class="block-loading-item-field"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "projectVulns",
    props: ['portalProject'],
    data() {
        return {
            list: null,
            orderBy: 'id',
            orderByType: 'asc',
            status: 'new',
            page: 1
        }
    },
    computed: {
        take() {
            let take = 100;
            if (this.portalProject && this.portalJitReport.vulns) {
                take    =   this.portalJitReport.vulns;
            }
            return take;
        }
    },
    created() {
        this.getList();
    },
    methods: {
        warn(cvss) {
            if (cvss) {
                let num = parseFloat(cvss.substring(0,4));
                if (!isNaN(num)) {
                    return num;
                }
            }
            return 0;
        },
        async getList() {
            if (this.portalProject) {
                let list = await this.$store.dispatch('localStorage/portalJitReport_getWhere', {
                    project_id: this.portalProject.id,
                    status: this.status,
                    orderBy: this.orderBy,
                    orderByType: this.orderByType,
                    page: this.page,
                    take: this.take
                });
                if (list.data) {
                    this.list = list.data;
                }
            }
        }
    }
}
</script>

<style>

</style>