<template>
    <div class="modalbox-slot">
        <div class="modalbox-slot-header">
            <div class="modalbox-slot-header-title">Filter</div>
            <div class="modalbox-slot-header-desc">Unverified</div>
        </div>
        <div class="modalbox-slot-body">
            <div class="modalbox-slot-body-form">
                <div class="modalbox-slot-body-form-item">
                    <div class="modalbox-slot-body-form-item-title">Type</div>
                    <div class="modalbox-slot-body-form-item-option">
                        <select v-model="type">
                            <option v-for="(tp,key) in types" :key="key" :value="tp.key">{{ tp.value }}</option>
                        </select>
                    </div>
                </div>
                <div class="modalbox-slot-body-form-item">
                    <div class="modalbox-slot-body-form-item-title">Status</div>
                    <div class="modalbox-slot-body-form-item-option">
                        <select v-model="status">
                            <option v-for="(stat,key) in statuses" :key="key" :value="stat.key">{{ stat.value }}</option>
                        </select>
                    </div>
                </div>
                <!--                <div class="modalbox-slot-body-form-item">
                                    <div class="modalbox-slot-body-form-item-title">Full search</div>
                                    <div class="modalbox-slot-body-form-item-option">
                                        <input type="text" v-model="search">
                                    </div>
                                </div>-->
            </div>
        </div>
        <div class="modalbox-slot-body-footer">
            <button @click="applyFilter">Apply filter</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "unverifiedFilter",
    data() {
        return {
            search: '',
            type: 'ALL',
            types: [
                {
                    key: 'ALL',
                    value: 'ALL'
                },
                {
                    key: 'INFO',
                    value: 'INFO'
                },
                {
                    key: 'WARNING',
                    value: 'WARNING'
                },
                {
                    key: 'VULN',
                    value: 'VULN'
                }
            ],

            status: 'NEW',
            statuses: [
                {
                    key: 'ALL',
                    value: 'ALL'
                },
                {
                    key: 'NEW',
                    value: 'NEW'
                },
                {
                    key: 'FP',
                    value: 'FP'
                },
                {
                    key: 'DELETED',
                    value: 'DELETED'
                },
            ]
        }
    },
    methods: {
        applyFilter() {
            let data  = {
                type: this.type,
                status: this.status,
                search: this.search.trim()
            };
            this.$emit('setFilter', data);
            this.$emit('closeModal');
        }
    }
}
</script>

<style scoped>

</style>