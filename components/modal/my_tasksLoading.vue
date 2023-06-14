<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "my_tasksLoading",
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
  }
})
</script>

<template>
    <div class="block-dashboard-loading" :class="{'block-dashboard-loading-dark':mode}">
        <div class="block-dashboard-loading-left">
            <div class="block-dashboard-loading-left-items">
                <div class="block-dashboard-loading-left-item">
                    <div class="block-dashboard-loading-left-item-header">
                        <div class="block-dashboard-loading-left-item-header-left">
                            <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
                        </div>
                        <div class="block-dashboard-loading-left-item-header-right">
                            <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
                        </div>
                    </div>
                </div>
                <div class="block-dashboard-loading-left-item">
                    <div class="block-dashboard-loading-left-item-header">
                        <div class="block-dashboard-loading-left-item-header-left">
                            <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
                        </div>
                        <div class="block-dashboard-loading-left-item-header-right">
                            <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block-dashboard-loading-right" :class="{'block-dashboard-loading-right-dark':mode}">
            <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
            <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
            <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
            <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
        </div>
    </div>
</template>

<style >

</style>