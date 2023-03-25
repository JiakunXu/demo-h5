<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="item in list" :key="item.id" :title="item.name" />
            </van-list>
        </van-pull-refresh>
    </div>
</template>
  
<script setup>
import { listCoupons } from "@/api/coupon";

const { proxy } = getCurrentInstance();

const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);
const pageNo = ref(1);
const pageSize = ref(10);
const list = ref([]);

onMounted(() => {

});

function onLoad() {
    getCouponList({
        "houseId": 10000000
    });
}

function onRefresh() {
    finished.value = false;
    loading.value = true
    pageNo.value = 1;

    onLoad();
}

function getCouponList(data) {
    if (finished.value) {
        return;
    }

    listCoupons({
        ...data,
        pageNo: pageNo.value,
        pageSize: pageSize.value,
    }).then((res) => {
        const rows = res.rows;

        list.value = pageNo.value === 1 ? rows : list.value.concat(rows);
        pageNo.value = pageNo.value + 1;

        refreshing.value = false;
        loading.value = false;
        finished.value = !rows || rows.length < pageSize.value;
    });
}

</script>

<style scoped></style>