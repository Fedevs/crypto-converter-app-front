<template>
  <div class="field">
    <label id="testLabel" for="amount" class="label">{{ label }}</label>
    <div class="control is-flex">
      <input
        class="input"
        type="number"
        id="amount"
        name="amount"
        v-model.trim="selectedCoin.amount"
        :disabled="readonly"
        :placeholder="placeholder"
        @input="sendData"
      />
      <div class="select is-primary">
        <select v-model.trim="selectedCoin.symbol" @change="sendData">
          <option
            v-for="coin in coins"
            :key="coin.id || coin.symbol"
            :value="coin.symbol"
          >
            {{ coin.symbol.toUpperCase() }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
      description: "True if disabled input",
    },
    placeholder: {
      type: String,
      description: "A hint for users",
    },
    coins: {
      type: Array,
      required: true,
      description: "It must contain a symbol attribute to be displayed.",
    },
    selectedCoin: {
      type: Object,
      required: true,
      description: "It must contain an amount and symbol attribute",
    },
  },
  methods: {
    sendData: function () {
      this.$emit("update:selectedCoin", this.selectedCoin);
    },
  },
};
</script>

<style>
.select {
  width: 90px;
}
</style>
