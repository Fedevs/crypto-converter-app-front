<template>
  <div v-if="!$fetchState.pending" class="padding">
    <form class="box layout">
      <fieldset>
        <legend class="has-text-centered is-size-3">
          <strong>Coin Converter</strong>
        </legend>
        <CoinInput
          label="From"
          placeholder="Amount to be converted"
          :coins="coins"
          :selectedCoin="baseCurrency"
          @selectedCoin.sync="baseCurrency"
        ></CoinInput>
        <CoinInput
          label="To"
          readonly
          :coins="currencies"
          placeholder="Total amount"
          :selectedCoin="quoteCurrency"
          @selectedCoin.sync="quoteCurrency"
        >
        </CoinInput>
      </fieldset>
      <button
        class="button is-dark rounded"
        type="submit"
        @click.prevent="getExchangeRate"
      >
        Convert
      </button>
    </form>
  </div>
  <div v-else class="layout">
    <div class="custom-loader">
      <img
        src="@/static/loader.gif"
        width="200"
        height="200"
        alt="Loading..."
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CoinInput from "./CoinInput.vue";

export default {
  name: "Conversor",
  data() {
    return {
      coins: [],
      currencies: [],
      baseCurrency: {},
      quoteCurrency: {},
    };
  },
  created() {
    this.baseCurrency = {
      symbol: "btc",
      amount: "",
    };
    this.quoteCurrency = {
      symbol: "usd",
      amount: "",
    };
  },
  async fetch() {
    try {
      const coins = await axios.get("http://localhost:8080/coins");
      const currencies = await axios.get("http://localhost:8080/currencies");
      if (coins.status === 200) this.coins = coins.data.response;
      if (currencies.status === 200)
        this.currencies = currencies.data.response.map((currency) => {
          return {
            symbol: currency,
          };
        });
    } catch (error) {
      throw new Error(error);
    }
  },
  computed: {
    coinId: function () {
      return this.coins.filter(
        (coin) => coin.symbol === this.baseCurrency.symbol
      )[0].id;
    },
  },
  methods: {
    getExchangeRate: async function () {
      try {
        let {
          status,
          data: { result },
        } = await axios.get("http://localhost:8080/convert", {
          params: {
            ids: this.coinId,
            vs_currencies: this.quoteCurrency.symbol,
            amount: this.baseCurrency.amount,
          },
        });
        if (status === 200) this.quoteCurrency.amount = result;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  components: { CoinInput },
};
</script>
<style>
.padding {
  padding-top: 10%;
}

@media (max-width: 480px) {
  .padding {
    padding-top: 35%;
  }
}

.layout {
  max-width: 600px;
  margin: 0 auto;
}

.button {
  width: 100%;
  margin: 20px auto;
}

.custom-loader {
  display: flex;
  justify-content: center;
}
</style>
