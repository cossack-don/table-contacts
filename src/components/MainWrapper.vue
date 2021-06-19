<template>
  <div class="main-wrapper">
    <!-- FORM COMPONENT -->
    <transition name="fade">
      <form class="main-modal" v-if="formHide" @submit.prevent="addNewUser">
        <!-- header -->
        <div class="main-modal__header">
          <h3 class="main-modal__title">Добавление пользователя</h3>
          <div class="main-modal__btn-close" @click="showModalPupop">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512.001 512.001"
              style="enable-background: new 0 0 512.001 512.001"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z"
                  />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </div>

        <!-- body -->
        <div class="main-modal__body">
          <!-- INPUT NAME -->
          <div class="input-name">
            <p>Имя</p>
            <input v-model="valueForm.name" class="item-input" />
          </div>
          <!-- INPUT PHONE -->
          <div class="input-phone">
            <p>Телефон</p>
            <input v-model="valueForm.tel" class="item-input" />
          </div>
          <!-- SELECT -->
          <div class="main-select">
            <p>Начальник</p>
            <select v-model="$store.state.select" class="item-input">
              <option value=""></option>
              <option v-for="(item, index) in items" :key="index">
                {{ item.name }}
              </option>
            </select>
          </div>
          <!-- message ERRORS -->
          <div v-if="showErrorMessage" class="error-message">
            Обязательно заполните Имя и Телефон:)
          </div>
          <div v-if="showMessageErrorDubleName" class="error-message">
            Такое имя или номер телефона уже занят!
          </div>
          <!-- BTN ADD NEW USER -->
          <button class="button-save">add New User</button>
        </div>
      </form>
    </transition>

    <!-- FORM END -->

    <!-- BTN HIDE OR SHOW FORM COMPONENT-->
    <button @click="handlerHideOrShowForm" class="button-form">
      Show FORM
    </button>
    <!-- ENDHIDE OR SHOW FORM-->

    <!--  TABLE COMPONENT-->
    <div class="wrapper-table">
      <!-- header -->
      <table class="table-title">
        <tr>
          <td class="table-title__name" @click="sortItems">
            Name &#9650; &#9660;
          </td>
          <td class="table-title__phone" @click="sortItemsTelefons">
            Phone &#9650; &#9660;
          </td>
        </tr>
      </table>

      <!-- PARENT TABLE USER -->
      <table v-for="(item, index) in items" :key="index">
        <table class="table-parent">
          <tr>
            <td class="table-parent__name">{{ item.name }}</td>
            <td class="table-parent__phone">{{ item.tel }}</td>
          </tr>
        </table>

        <!-- CHILD TABLE USER -->
        <table
          class="table-child"
          v-for="(itemChild, index) in item.arrayChildUser"
          :key="index"
        >
          <tr>
            <td class="table-child__name">{{ itemChild.name }}</td>
            <td class="table-child__phone">{{ itemChild.tel }}</td>
          </tr>
        </table>
        <!-- END CHILD TABLE USER -->
      </table>
    </div>
  </div>
</template>

<script>
// import ModalPopup from "@/components/modules/modal-popup/ModalPopup";
// import MainTable from "@/components/modules/table/MainTable";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      items: (state) => state.items,
    }),
  },
  data() {
    return {
      valueForm: {
        name: "",
        tel: "",
        arrayChildUser: [],
      },
      formHide: false,
      showErrorMessage: false,
      showMessageErrorDubleName: false,
    };
  },
  methods: {
    // ====================================================
    addNewUser() {
      // проверка на пустые инпуты
      if (this.valueForm.name === "" || this.valueForm.tel === "") {
        this.showErrorMessage = true;
        return false;
      }

      // если селект не пустой, добавляекм к этому родителю подраздел чайлд-итем
      if (this.$store.state.select !== "") {
        this.showErrorMessage = false;

        this.items.forEach((item) => {
          // если имя селекта === имени родительского имени, добавляем к нему итем
          if (this.$store.state.select === item.name) {
            item.arrayChildUser.push({
              name: this.valueForm.name,
              tel: this.valueForm.tel,
            });
            // очищаем поля инпутов
            this.valueForm.name = "";
            this.valueForm.tel = "";
          }
        });
      } else {
        this.showErrorMessage = false;

        let flagValidateDubleName = true;

        this.items.forEach((item) => {
          if (
            this.valueForm.name === item.name ||
            this.valueForm.tel === item.tel
          ) {
            this.showMessageErrorDubleName = true;
            flagValidateDubleName = false;
          }
        });

        // проверка на повторение имене
        if (flagValidateDubleName) {
          this.showMessageErrorDubleName = false;
          // добавляем родительский компонент - юсер
          this.items.push({ ...this.valueForm });
          // очищаем форму
          this.valueForm.arrayChildUser = [];
          this.valueForm.name = "";
          this.valueForm.tel = "";
        }
      }
    },
    // ====================================================
    handlerHideOrShowForm() {
      this.formHide = !this.formHide;
    },
    // ====================================================
    showModalPupop() {
      this.formHide = false;
    },
    // ====================================================
    sortItemsTelefons() {
      let flagForSortReverse = false;

      this.items.sort((a, b) => {
        if (a.tel.trim() > b.tel.trim()) {
          flagForSortReverse = true;
          return 1;
        }

        if (a.tel.trim() < b.tel.trim()) {
          flagForSortReverse = false;
          return -1;
        }

        return 0;
      });

      if (flagForSortReverse) {
        this.items.reverse();
      }
    },
    // ====================================================
    sortItems() {
      let flagForSortReverse = false;

      this.items.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          flagForSortReverse = true;
          return 1;
        }

        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          flagForSortReverse = false;
          return -1;
        }

        return 0;
      });

      if (flagForSortReverse) {
        this.items.reverse();
      }
    },
    // ====================================================
  },
};
</script>

<style>
/*  ==================================================== */
table {
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  padding: 15px;
}
/*  ==================================================== */
.wrapper-table {
  width: 400px;
  margin: 0 auto;
}
.table-title {
  width: 400px;
}
.table-title__name {
  width: 238px;
  transition: 0.5s;
  background: #95ecb7;
}
.table-title__phone {
  transition: 0.5s;
  background: #95ecb7;
}
.table-title__name:hover,
.table-title__phone:hover {
  cursor: pointer;
  transition: 0.5s;
  background: #30f17a;
}
/*  ========================table parent============================ */
.table-parent {
  width: 400px;
}
.table-parent__name {
  word-break: break-all;
  background: #9bec95;
  width: 238px;
}
.table-parent__phone {
  background: #9bec95;
  word-break: break-all;
}
/*  ============================table child======================== */
.table-child {
  width: 350px;
  margin-left: 50px;
}
.table-child__phone {
  border-top: none;
  word-break: break-all;
}
.table-child__name {
  word-break: break-all;
  width: 188px;
  border-top: none;
}
/*  ============================btns======================== */
/*  */
.button-save,
.button-form {
  width: 150px;
  padding: 10px 5px;
  margin-top: 85px;

  border-radius: 10px;
  border: none;
  background: #0ad457;

  transition: 0.5s;
}
.button-save:hover,
.button-form:hover {
  cursor: pointer;
  transition: 0.5s;
  background: #30f17a;
}
.button-form {
  margin: 15px auto;
}
.main-select {
  display: flex;
  justify-content: space-between;
}
.input-name {
  display: flex;
  justify-content: space-between;
}
.input-phone {
  display: flex;
  justify-content: space-between;
}
/*  =========================modal=========================== */
/*  */
.main-modal {
  border: solid 1px #858282;
  border-radius: 5px;

  margin: 0 auto;
  max-width: 400px;
  height: 350px;
  padding: 15px;
}

.main-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* .main-modal__title {
} */
.main-modal__btn-close {
  transition: 0.5s;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
}

.main-modal__btn-close svg {
  width: 15px;
  height: 15px;
}
.main-modal__btn-close:hover {
  background: #30f17a;
  border-radius: 5px;
  transition: 0.5s;
  cursor: pointer;
}
.item-input {
  width: 70%;
  margin-bottom: 15px;
  padding: 5px;
}
.main-modal__body {
  margin-top: 25px;
}
.error-message {
  color: red;
}
/*  */
/*  =========================animate modal=========================== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

