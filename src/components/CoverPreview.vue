<template>
    <div class="modal" ref="modal">
        <div class="modal-content">
            <Close @click="closePreview" class="icon" />
            <img :src="this.blogCoverPhoto" alt="Blog Photo" />
        </div>
    </div>
</template>

<script>
import Close from '../assets/icons/times.svg';
export default {
    components: { Close },
    methods: { closePreview() { this.$store.commit('openPhotoPreview'); } },
    computed: { blogCoverPhoto() { return this.$store.state.blog_photo_url; } }
};
</script>
  
<style lang="scss" scoped>
.modal {
    .modal-content {
        border-radius: 12px;
        position: relative;
        height: 400px;
        width: 600px;
        padding: 50px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);

        .icon {
            width: 24px;
            height: auto;
            cursor: pointer;
            font-size: 24px;
            position: absolute;
            top: 15px;
            right: 15px;
            color: var(--blog-clr);
        }

        img {
            margin-top: 16px;
            height: 100%;
            object-fit: contain;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
        }
    }
}
</style>