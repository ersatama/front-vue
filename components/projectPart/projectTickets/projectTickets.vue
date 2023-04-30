<template>
    <div class="block-body-right" >
        <modal-detail :show="showDetail" @closeModal="showDetail = false">
            <project-tickets-detail :data="data" v-if="data" @closeModal="showDetail = false"></project-tickets-detail>
        </modal-detail>
        <div class="block-body-right-header">
            <div class="block-body-right-title">Tickets</div>
            <div class="block-body-right-desc">Project tickets</div>
            <div class="block-body-right-header-buttons">
                <button class="block-body-content-vuln">
                    <i class="block-body-content-filter-icon block-body-content-filter-icon-add"></i> Create ticket
                </button>
            </div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="tickets">
                    <template v-if="tickets.length > 0">
                        <div class="block-body-content-table-header">
                            <div class="block-body-content-table-tr">
                                <div class="block-body-content-table-item block-body-content-table-item-id">ID</div>
                                <div class="block-body-content-table-item block-body-content-table-item-longtext">Title</div>
                                <div class="block-body-content-table-item block-body-content-table-item-longstatus">Status</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">Priority</div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment">User</div>
                                <div class="block-body-content-table-item block-body-content-table-item-longdate">Dates</div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="block-body-content-table-body">
                            <div class="block-body-content-table-tr" v-if="live">
                                <div class="block-body-content-table-item block-body-content-table-item-id">-</div>
                                <div class="block-body-content-table-item block-body-content-table-item-longtext">SOC</div>
                                <div class="block-body-content-table-item block-body-content-table-item-longstatus">
                                    Open
                                    <template v-if="live.hasOwnProperty('new')">
                                        <br> New Replies: {{ live['new'] }}
                                    </template>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">
                                    <template v-if="live.hasOwnProperty('urgent')">
                                        {{ live['urgent'] }}
                                    </template>
                                    <template v-else>N/A</template>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment">
                                    <template v-if="live.hasOwnProperty('username')">
                                        {{ live['username'] }}
                                    </template>
                                    <template v-else>N/A</template>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-longdate">
                                    Open: <template v-if="live.hasOwnProperty('opendate')">{{ live['opendate'] }}</template><template v-else>N/A</template><br>
                                    Updated: <template v-if="live.hasOwnProperty('lastdate')">{{ live['lastdate'] }}</template><template v-else>N/A</template>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-option">
                                        <div class="block-body-content-table-item-option-select">
                                            <div class="block-body-content-table-item-option-select-angle"></div>
                                            <div class="block-body-content-table-item-option-select-list">
                                                <div class="block-body-content-table-item-option-select-item">Show</div>
                                            </div>
                                        </div>
                                        <div class="block-body-content-table-item-option-dots"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="block-body-content-table-tr" v-for="(ticket,key) in tickets" :key="key" @click.stop="showDetailInfo(ticket)">
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ ticket.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-longtext">{{ ticket.name }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-longstatus">
                                    {{ ticket.status_name }}
                                    <template v-if="ticket.cntnew_operator > 0">
                                        <br>New Replies: {{ ticket.cntnew_operator }}
                                    </template>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status"> {{ ticket.priority_name }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment">
                                    <template v-if="ticket.portalUser">
                                        <template v-if="ticket.portalUser.tt">{{ ticket.portalUser.tt }}</template>
                                        <template v-if="ticket.portalUser.fname">{{ ticket.portalUser.fname }}</template>
                                        <template v-if="ticket.portalUser.lname">{{ ticket.portalUser.lname }}</template>
                                    </template>
                                    <template v-else>-</template>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-longdate">
                                    Open: {{ ticket.opendate }}<br>
                                    Updated: {{ ticket.lastdate }}
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-option">
                                        <div class="block-body-content-table-item-option-select">
                                            <div class="block-body-content-table-item-option-select-angle"></div>
                                            <div class="block-body-content-table-item-option-select-list">
                                                <div class="block-body-content-table-item-option-select-item">Open</div>
                                            </div>
                                        </div>
                                        <div class="block-body-content-table-item-option-dots"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <project-no-data v-else></project-no-data>
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
import ProjectTicketsDetail from "./projectTicketsDetail.vue";

export default {
    name: "projectTickets",
    components: {
        ProjectTicketsDetail,
        ModalDetail,
        ProjectNoData,
        ProjectPartLoading
    },
    props: ['portalProject'],
    data() {
        return {
            orderBy: 'id',
            orderByType: 'asc',
            tickets: null,
            live: null,
            ticketsSize: 0,
            take: 20,
            page: 1,
            showDetail: false,
            data: null,
        }
    },
    created() {
        this.getList();
    },
    methods: {
        setOrderBy(orderBy) {
            if (orderBy === this.orderBy) {
                if (this.orderByType === 'asc') {
                    this.orderByType    =   'desc';
                } else {
                    this.orderByType    =   'asc';
                }
            } else {
                this.orderBy        =   orderBy;
                this.orderByType    =   'asc';
            }
            this.getList();
        },
        showDetailInfo(data) {
            this.data       =   data;
            this.showDetail =   true;
        },
        async getList() {
            let data = {
                project_id: this.portalProject.id,
                jit: this.portalProject.jit,
                take: this.take,
                page: this.page,
                orderBy: this.orderBy,
                orderByType: this.orderByType
            };
            let tickets = await this.$store.dispatch('localStorage/portalTicket_getWhere', data);
            if (tickets.data) {
                this.tickets    =   []
                tickets.data['unanswered'].forEach(item => {
                    this.tickets.push(item);
                });
                tickets.data['opened'].forEach(item => {
                    this.tickets.push(item);
                });
                tickets.data['closed'].forEach(item => {
                    this.tickets.push(item);
                });
                if (tickets.data.hasOwnProperty('live')) {
                    this.live   =   tickets.data['live'];
                }
            }
        },
        setTake(data) {
            this.take = data.take;
            this.page = data.page;
            this.getList();
        },
    }
}
</script>

<style lang="scss">

</style>