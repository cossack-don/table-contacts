<template>
  <form>
    <!-- header -->

    <!-- body -->
    <div>
      <InputName />
      <InputPhone />
      <ButtonSelect />
      <ButtonSave />
    </div>
  </form>
</template>

<script>
import InputName from "@/components/modules/modal-popup/InputName";
import InputPhone from "@/components/modules/modal-popup/InputPhone";
import ButtonSelect from "@/components/modules/modal-popup/ButtonSelect";
import ButtonSave from "@/components/modules/modal-popup/ButtonSave";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    InputName,
    InputPhone,
    ButtonSelect,
    ButtonSave,
  },

  methods: {},
};
</script>

      


    
