<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "my_tasksLoading"
})
</script>

<template>
    <div class="block-dashboard-loading">
        <div class="block-dashboard-loading-left">
            <div class="block-dashboard-loading-left-items">
                <div class="block-dashboard-loading-left-item">
                    <div class="block-dashboard-loading-left-item-header">
                        <div class="block-dashboard-loading-left-item-header-left">
                            <div class="block-loading-item-field"></div>
                        </div>
                        <div class="block-dashboard-loading-left-item-header-right">
                            <div class="block-loading-item-field"></div>
                        </div>
                    </div>
                </div>
                <div class="block-dashboard-loading-left-item">
                    <div class="block-dashboard-loading-left-item-header">
                        <div class="block-dashboard-loading-left-item-header-left">
                            <div class="block-loading-item-field"></div>
                        </div>
                        <div class="block-dashboard-loading-left-item-header-right">
                            <div class="block-loading-item-field"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block-dashboard-loading-right">
            <div class="block-loading-item-field"></div>
            <div class="block-loading-item-field"></div>
            <div class="block-loading-item-field"></div>
            <div class="block-loading-item-field"></div>
        </div>
    </div>
</template>

<style scoped>

</style>