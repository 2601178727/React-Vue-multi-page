<template>
    <p class="global-line-box" :class="{'dotted-line': data.isDotted}"></p>
</template>

<script>
export default {
    name: 'global-line',
    props: {
        data: {
            type: Object, // isDotted =>  虚线
            default: () => {return{}}
        }
    },
    data() {
        return {
            
        }
    }
}
</script>

<style lang="less">
    .global-line-box {
        display: block;
        width: 100%;
        height: 0;
        border: 1px solid #4C88FF;
    }
    .dotted-line {
        border: 1px dotted #4C88FF;
    }
</style>
