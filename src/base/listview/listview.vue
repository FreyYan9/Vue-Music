<template>
    <Scroll>
    	<h1>Hello Singer</h1>
    </Scroll>
</template>
<script type="text/javascript">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
    name: 'Listview',
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    },
    components: {
        Scroll,
        Loading
    }
}

</script>
