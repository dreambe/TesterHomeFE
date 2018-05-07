<template>
    <el-dialog title="Edit" v-model="dialogFormVisible" :close-on-click-modal="false" :show-close="false">
        <el-form :model="form">
            <el-form-item label="用例ID" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="form.id" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="用例类型" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="form.type" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="用例内容" :label-width="formLabelWidth">
                <el-input v-model="form.testcase" auto-complete="off"></el-input>
            </el-form-item>
            <!--
            <el-form-item label="sex" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="form.sex" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="zone" :label-width="formLabelWidth">
                <el-input v-model="form.zone" auto-complete="off"></el-input>
            </el-form-item> -->

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button :plain="true" type="danger" v-on:click="canclemodal">Cancel</el-button>
            <el-button :plain="true" @click="updateForm(form)">Save</el-button>
        </div>
    </el-dialog>
</template>


<script>
    export default {
        data(){
            return {
                formLabelWidth: '120px',
            }
        },
        props: ['dialogFormVisible', 'form'],

        methods: {
            updateForm: function (formName) {
                let itemId = formName.id;
                // let phone = formName.phone;
                // let zone = formName.zone;
                this.$axios.put('http://127.0.0.1:8000/api/persons/detail/' + itemId, {
                    phone: phone,
                    zone: zone
                })
                    .then(function (response) {
                        console.log(response);
                        this.form = response.data;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                location.reload();
            },
            canclemodal: function () {
                this.$emit('canclemodal');
            }
        }

    }

</script>