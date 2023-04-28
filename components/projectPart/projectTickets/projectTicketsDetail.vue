<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Ticket
                </div>
                <div class="modalbox-detail-content-header-detail-desc">
                    #{{ data.id }}
                </div>
            </div>
            <div class="modalbox-detail-content-header-btns">
                <div class="modalbox-detail-content-header-btn">
                    <div class="modalbox-detail-content-header-btn-dots"></div>
                    <div class="modalbox-detail-content-header-btn-select">
                        <div class="modalbox-detail-content-header-btn-select-angle"></div>
                        <div class="block-body-content-table-item-option-select-list">
                            <div class="block-body-content-table-item-option-select-item">Open</div>
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
                    <div class="modalbox-detail-content-item-title">Title</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.name">
                        {{ data.name }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Email</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.email">
                        {{ data.email }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Start alert</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.startalert">
                        {{ data.startalert }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Status</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.status_name">
                        {{ data.status_name }} <span v-if="data.cntnew_operator > 0"><br>New Replies: {{ data.cntnew_operator }}</span>
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Priority</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.priority_name">
                        {{ data.priority_name }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Dates</div>
                    <div class="modalbox-detail-content-item-value">
                        Open: {{ data.opendate }}<br>
                        Updated: {{ data.lastdate }}
                    </div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">User</div>
                    <div class="modalbox-detail-content-item-value" v-if="data.portalUser">
                        <template v-if="data.portalUser.tt">{{ data.portalUser.tt }}</template>
                        <template v-if="data.portalUser.fname">{{ data.portalUser.fname }}</template>
                        <template v-if="data.portalUser.lname">{{ data.portalUser.lname }}</template>
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>


                <div class="modalbox-detail-content-item modalbox-detail-content-item-object" v-if="data.portalUser">
                    <div class="modalbox-detail-content-item-title">
                        User
                    </div>
                    <div class="modalbox-detail-content-item-list">
                        <div class="modalbox-detail-content-item-list-info" @click="checkSelected(data.portalUser.id)">
                            <template v-if="data.portalUser.tt">{{ data.portalUser.tt }}</template>
                            <template v-if="data.portalUser.fname">{{ data.portalUser.fname }}</template>
                            <template v-if="data.portalUser.lname">{{ data.portalUser.lname }}</template>
                            <span>#{{ data.portalUser.id }}</span>
                            <div class="block-body-left-item-icon-arr" :class="{'modalbox-detail-content-item-list-arr':tickets.includes(data.portalUser.id)}"></div>
                        </div>
                        <div class="modalbox-detail-content-item-list-details" :class="{'modalbox-detail-content-item-list-details-hide':!tickets.includes(data.portalUser.id)}">
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.id">{{ data.portalUser.id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Neuron ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.neuron_id">{{ data.portalUser.neuron_id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Company</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.company">{{ data.portalUser.company }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Website</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.website">{{ data.portalUser.website }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Phone</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.phone_code">{{ data.portalUser.phone_code }} {{ data.portalUser.phone }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Fax</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.fax">{{ data.portalUser.fax }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Country</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.country">{{ data.portalUser.country }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">City</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.city">{{ data.portalUser.city }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Street</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.street">{{ data.portalUser.street }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Street 2</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.street2">{{ data.portalUser.street2 }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Pos</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.pos">{{ data.portalUser.pos }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Postal</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.postal">{{ data.portalUser.postal }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">IP / IP last</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.ip">
                                        {{ data.portalUser.ip }} / <template v-if="data.portalUser.iplast">{{ data.portalUser.iplast }}</template><template v-else>-</template>
                                    </template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Allow mobile</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.allowbigmobile">{{ data.portalUser.allowbigmobile }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Allow express</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.allowexpress">{{ data.portalUser.allowexpress }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">Allow discovery</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.allowsmalldiscovery">{{ data.portalUser.allowsmalldiscovery }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">SSO ID</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.sso_id">{{ data.portalUser.sso_id }}</template>
                                    <template v-else>-</template>
                                </div>
                            </div>
                            <div class="modalbox-detail-content-item-list-view">
                                <div class="modalbox-detail-content-item-list-view-key">SSO Type</div>
                                <div class="modalbox-detail-content-item-list-view-value">
                                    <template v-if="data.portalUser.sso_type">{{ data.portalUser.sso_type }}</template>
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
    name: "projectTicketsDetail",
    props: ['data'],
    components: { vueCustomScrollbar },
    data() {
        return {
            tickets: [],
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
        checkSelected(id) {
            if (this.tickets.includes(id)) {
                let index = this.tickets.indexOf(id);
                if (index !== -1) {
                    this.tickets.splice(index, 1);
                }
            } else {
                this.tickets.push(id);
            }
        },
    }
}
</script>

<style scoped>

</style>