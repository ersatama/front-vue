<template>
    <div class="block-body-content-table-info">
        <div class="block-body-content-table-info-detail">
            <div class="block-body-content-table-info-detail-title">
                Found <span v-if="size > 0">{{ size }}</span>
                <template v-else>Empty result</template>
            </div>
        </div>
        <div class="page-left-header-detail" v-if="size > min">
            <div class="page-left-header-pagination">
                <div class="page-left-header-pages page-left-header-prev" v-if="prev" @click="pageBreak--"></div>
                <div class="page-left-header-pages" :class="{'page-left-header-pages-selected':(page === n)}" v-for="(n,key) in ranges" :key="key" @click="setPage(n)">{{ n }}</div>
                <div class="page-left-header-pages page-left-header-next" v-if="next" @click="pageBreak++"></div>
            </div>
            <div class="page-left-header-take">
                <select @change="setTake($event.target.value)">
                    <option v-for="(item, key) in list" :key="key" :value="item" :selected="take === item">{{ item }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "projectPagination",
    props: ['size', 'page', 'take'],
    data() {
        return {
            view: 5,
            pageBreak: 1,
            list: [20, 50, 100],
            min: 20
        }
    },
    computed: {
        pages() {
            let pages = 0;
            if (this.size > this.take) {
                let count = Math.floor(this.size / this.take);
                let last  = this.size % this.take;
                if (last > 0) {
                    count++;
                }
                pages = count;
            }
            return pages;
        },
        ranges() {
            let ranges = [];
            if (this.pages > this.view) {
                let max = this.pageBreak * this.view;
                if (max > this.pages) {
                    max = this.pages;
                }
                for (let i = ((this.pageBreak - 1) * this.view); i < max; i++) {
                    ranges.push(i + 1);
                }
            } else {
                for (let i = 0; i < this.pages; i++) {
                    ranges.push(i + 1);
                }
            }
            return ranges;
        },
        prev() {
            let prev = false;
            if (this.pageBreak > 1) {
                prev = true;
            }
            return prev;
        },
        next() {
            let next = false;
            if ((this.pages - (this.pageBreak * this.view)) > 0) {
                next = true;
            }
            return next;
        },
    },
    methods: {
        setPage(page) {
            this.$emit('setTake', {
                page: page,
                take: this.take
            });
        },
        setTake(take) {
            this.$emit('setTake', {
                page: 1,
                take: take
            });
        }
    }
}
</script>

<style scoped>

</style>