<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "theNavbarDetail",
    computed: {
        user() {
            return this.$store.state.localStorage.user;
        },
    },
    methods: {
        getNameLetter(user) {
            let letters = '';
            if (user.name) {
                letters += user.name[0];
            }
            if (user.surname) {
                letters += user.surname[0];
            }
            return letters;
        },
        logout() {
            this.$store.commit('localStorage/setUser', null);
            window.location.href = '/login';
        }
    },
})
</script>

<template>
    <div class="modalbox-slot">
        <div class="modalbox-slot-header">
            <div class="modalbox-slot-header-title">Profile</div>
            <div class="modalbox-slot-header-desc">Account details</div>
        </div>
        <div class="modalbox-slot-body">
            <div class="modalbox-slot-body-form modalbox-slot-body-form-list">
                <div class="modalbox-slot-body-form-detail modalbox-slot-body-form-detail-main">
                    <div class="modalbox-slot-body-form-detail-logo">
                        <div class="modalbox-slot-body-form-detail-name">{{ getNameLetter(user) }}</div>
                    </div>
                    <div class="modalbox-slot-body-form-detail-info">
                        <div class="modalbox-slot-body-form-detail-info-title">{{ user.name }} {{ user.surname }}</div>
                        <div class="modalbox-slot-body-form-detail-info-desc" v-if="user.auditor && user.auditor.user">{{ user.auditor.user }}</div>
                        <div class="modalbox-slot-body-form-detail-info-add">{{ user.role }}</div>
                    </div>
                </div>
                <NuxtLink to="/profile" @click.native="$emit('closeModal')" class="modalbox-slot-body-form-detail modalbox-slot-body-form-detail-item">
                    <div class="modalbox-slot-body-form-detail-icon modalbox-slot-body-form-detail-icon-profile"></div>
                    <div class="modalbox-slot-body-form-detail-info">Edit profile</div>
                </NuxtLink>
                <NuxtLink to="/profile?tab=settings" class="modalbox-slot-body-form-detail modalbox-slot-body-form-detail-item">
                    <div class="modalbox-slot-body-form-detail-icon modalbox-slot-body-form-detail-icon-settings"></div>
                    <div class="modalbox-slot-body-form-detail-info">Settings</div>
                </NuxtLink>
                <NuxtLink to="/profile?tab=notifications" class="modalbox-slot-body-form-detail modalbox-slot-body-form-detail-item">
                    <div class="modalbox-slot-body-form-detail-icon modalbox-slot-body-form-detail-icon-notification"></div>
                    <div class="modalbox-slot-body-form-detail-info">Notifications</div>
                </NuxtLink>
                <NuxtLink to="/profile?tab=security" class="modalbox-slot-body-form-detail modalbox-slot-body-form-detail-item">
                    <div class="modalbox-slot-body-form-detail-icon modalbox-slot-body-form-detail-icon-security"></div>
                    <div class="modalbox-slot-body-form-detail-info">Privacy and security</div>
                </NuxtLink>
                <NuxtLink to="/profile?tab=faq" class="modalbox-slot-body-form-detail modalbox-slot-body-form-detail-item">
                    <div class="modalbox-slot-body-form-detail-icon modalbox-slot-body-form-detail-icon-faq"></div>
                    <div class="modalbox-slot-body-form-detail-info">FAQ</div>
                </NuxtLink>
                <NuxtLink to="/profile?tab=asc" class="modalbox-slot-body-form-detail modalbox-slot-body-form-detail-item">
                    <div class="modalbox-slot-body-form-detail-icon modalbox-slot-body-form-detail-icon-question"></div>
                    <div class="modalbox-slot-body-form-detail-info">Ask Question</div>
                </NuxtLink>
                <div class="modalbox-slot-body-form-detail modalbox-slot-body-form-detail-item" @click="logout">
                    <div class="modalbox-slot-body-form-detail-icon modalbox-slot-body-form-detail-icon-logout"></div>
                    <div class="modalbox-slot-body-form-detail-info">Log out</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>