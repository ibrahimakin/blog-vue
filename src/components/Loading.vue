<template>
    <div class="loading">
        <span></span>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style lang="scss" scoped>
.loading {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;

    @media screen and (max-width: 800px) and (min-width: 450px) {
        padding-left: var(--sidenav-width);
    }

    @keyframes spin {
        to {
            transform: rotateZ(360deg);
        }
    }

    span {
        width: 60px;
        height: 60px;
        border: 3px solid transparent;
        border-top-color: #fff;
        border-bottom-color: #fff;
        border-radius: 50%;
        animation: spin ease 1s infinite;
    }
}
</style>