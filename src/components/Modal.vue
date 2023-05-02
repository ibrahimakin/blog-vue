<template>
    <div class="modal">
        <div class="modal-content">
            <p>{{ this.message }}</p>
            <button @click="close">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['message'],
    methods: { close() { this.$emit('close-modal'); } }
}
</script>

<style lang="scss" scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 2;

    .modal-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 8px;
        width: 300px;
        padding: 40px 30px;
        background-color: #fff;

        p {
            text-align: center;
        }

        button {
            align-self: center;
        }
    }
}
</style>