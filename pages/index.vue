<template>
  <div class="has-background-dark" style="height: 100vh">
    <Conversor />
  </div>
</template>

<script>
import Conversor from "@/components/Conversor";
import "@/node_modules/bulma/css/bulma.css";

export default {
  head() {
    return {
      title: "Coin converter app",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "get the exchange rate of any coin",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    };
  },
  components: {
    Conversor,
  },
};
</script>
