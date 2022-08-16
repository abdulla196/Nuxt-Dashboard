<template>
    <div class="wrapper" id="app">
        <div class="card-form">
            <div class="card-form__inner">
                <div class="card-input">
                    <label for="UserName" class="card-input__label">user name</label>
                    <input type="text" id="UserName" class="card-input__input" v-model="UserName"
                         data-ref="UserName" autocomplete="off">
                </div>
                <div class="card-input">
                    <label for="Email" class="card-input__label">Email</label>
                    <input type="email" id="Email" class="card-input__input" v-model="Email"
                         data-ref="Email" autocomplete="off">
                </div>
                <div class="card-input">
                    <label for="cardNumber" class="card-input__label">Card Number</label>
                    <input type="text" id="cardNumber" class="card-input__input" v-model="cardNumber" @keyup='inputFormat()'
                     @focus="focusInput" maxlength="19" @blur="blurInput" data-ref="cardNumber"
                        autocomplete="off">
                </div>
                <div class="card-input">
                    <label for="cardName" class="card-input__label">Card Holders</label>
                    <input type="text" id="cardName" class="card-input__input" v-model="cardName"
                        v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardName" autocomplete="off">
                </div>
                <div class="card-form__row">
                    <div class="card-form__col">
                        <div class="card-form__group">
                            <label for="cardMonth" class="card-input__label">Expiration Date</label>
                            <select class="card-input__input -select" id="cardMonth" v-model="cardMonth"
                                v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardDate">
                                <option value="" disabled selected>Month</option>
                                <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12"
                                    v-bind:disabled="n < minCardMonth" v-bind:key="n">
                                    {{ n < 10 ? '0' + n : n }} </option>
                            </select>
                            <select class="card-input__input -select" id="cardYear" v-model="cardYear"
                                v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardDate">
                                <option value="" disabled selected>Year</option>
                                <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">
                                    {{ $index + minCardYear }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="card-form__col -cvv">
                        <div class="card-input">
                            <label for="cardCvv" class="card-input__label">CVV</label>
                            <input type="text" class="card-input__input" id="cardCvv" maxlength="4" v-model="cardCvv"
                                v-on:focus="flipCard(true)" v-on:blur="flipCard(false)" autocomplete="off">
                        </div>
                    </div>
                </div>

                <button class="card-form__button" @click="OnAddCard">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
            cardName: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",
            UserName:'',
            Email:'',
            minCardYear: new Date().getFullYear(),
            amexCardMask: "#### ###### #####",
            otherCardMask: "################",
            cardNumberTemp: "",
            isCardFlipped: false,
            focusElementStyle: null,
            isInputFocused: false,
            regx: [
                { name: 'Visa', logo: 'https://seeklogo.com/images/V/visa-logo-CF29426B98-seeklogo.com.png', re: '^4', },
                { name: 'Hipercard', logo: 'https://cdn.worldvectorlogo.com/logos/hipercard.svg', re: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/ },
                { name: 'MasterCard', logo: 'https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-novo-3.png', re: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/ },
                { name: 'Discover', logo: 'https://i.pinimg.com/originals/b3/d7/85/b3d7853a11dcc8c424866915ddd4d3e3.png', re: /^(6011|65|64[4-9]|622)/ },
                { name: 'Elo', logo: 'https://seeklogo.com/images/E/elo-logo-0B17407ECC-seeklogo.com.png', re: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/ },
                { name: 'American Express', logo: 'https://ccard-generator.com/assets/images/cardmedium/american-express.png', re: /^3[47]\d{13,14}$/ }
            ],
        };
    },
    mounted() {
        this.cardNumberTemp = this.otherCardMask;
        document.getElementById("cardNumber").focus();
    },
    computed: {
        minCardMonth() {
            if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
            return 1;
        }
    },
    watch: {
        cardYear() {
            if (this.cardMonth < this.minCardMonth) {
                this.cardMonth = "";
            }
        }
    },
    methods: {
    ...mapActions(['OnAddCard']),
        OnAddCard(){

        },
        
        
        inputFormat() {
            let text = this.cardNumber.split(" ").join("")
            //this.cardVdid is not formated in 4 spaces
            this.cardVadid = text
            if (text.length > 0) {
                //regExp 4 in 4 number add an space between
                text = text.match(new RegExp(/.{1,4}/, 'g')).join(" ")
                                                //accept only numbers
                    .replace(new RegExp(/[^\d]/, 'ig'), " ");
            }
            //this.cardNumber is formated on 4 spaces
            this.cardNumber = text
            //after formatd they callback cardType for choose a type of the card
            this.GetCardType(this.cardVadid)
        },
        
        GetCardType(number) {
            this.regx.forEach((item) => {
                if (number.match(item.re) != null) {
                    this.cardType = item.logo
                    //cClass add a class with the name of cardName to manipulate with css
                    this.cClass = item.name.toLowerCase()
                } else if (!number) {
                    this.cardType = ''
                    this.cClass = ''
                }
            })
            //after choose a cardtype return the number for the luhn algorithm 
            this.validCreditCard(number)
        },
                   validCreditCard(value) {
                    let inputValidate = document.getElementById('cardNumber')
                    // luhn algorithm
                    let numCheck = 0,
                        bEven = false;
                    value = value.toString().replace(new RegExp(/\D/g, ""));
                    for (let n = value.length - 1; n >= 0; n--) {
                        let cDigit = value.charAt(n),
                            digit = parseInt(cDigit, 10);

                        if (bEven && (digit *= 2) > 9) digit -= 9;
                        numCheck += digit;
                        bEven = !bEven;
                    }
                    let len = value.length;
                    //true: return valid number
                    //this.cardType return true if have an valid number on regx array
                    if (numCheck % 10 === 0 && len === 19 && this.cardType) {
                        inputValidate.classList.remove('notValid')
                        inputValidate.classList.add('valid')
                    }
                    //false: return not valid number
                    else if (!numCheck % 10 === 0 && len === 19) {
                        inputValidate.classList.remove('valid')
                        inputValidate.classList.add('notValid')
                        //if not have number on input
                    } else {
                        inputValidate.classList.remove('valid')
                        inputValidate.classList.remove('notValid')
                    }

                },
        focusInput(e) {
            this.isInputFocused = true;
            let targetRef = e.target.dataset.ref;
            let target = this.$refs[targetRef];
        },
        blurInput() {
            let vm = this;
            setTimeout(() => {
                if (!vm.isInputFocused) {
                    vm.focusElementStyle = null;
                }
            }, 300);
            vm.isInputFocused = false;
        },
         
    }
}
</script>



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500,600,700|Source+Sans+Pro:400,600,700&display=swap");


body {
    background: #ddeefc;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
}

* {
    box-sizing: border-box;

    &:focus {
        outline: none;
    }
}

.wrapper {
    min-height: 100vh;
    display: flex;
    padding: 50px 15px;

    @media screen and (max-width: 700px),
    (max-height: 500px) {
        flex-wrap: wrap;
        flex-direction: column;
    }
}

.card-form {
    max-width: 570px;
    margin: auto;
    width: 100%;

    @media screen and (max-width: 576px) {
        margin: 0 auto;
    }

    &__inner {
        background: #fff;
        // box-shadow: 3px 13px 30px 0px rgba(21, 34, 67, 0.2);
        box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
        border-radius: 10px;
        padding: 35px;
        // padding-top: 180px;

        @media screen and (max-width: 480px) {
            padding: 25px;
            //   padding-top: 165px;
        }

        @media screen and (max-width: 360px) {
            padding: 15px;
            //   padding-top: 165px;
        }
    }

    &__row {
        display: flex;
        align-items: flex-start;

        @media screen and (max-width: 480px) {
            flex-wrap: wrap;
        }
    }

    &__col {
        flex: auto;
        margin-right: 35px;

        &:last-child {
            margin-right: 0;
        }

        @media screen and (max-width: 480px) {
            margin-right: 0;
            flex: unset;
            width: 100%;
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &.-cvv {
            max-width: 150px;

            @media screen and (max-width: 480px) {
                max-width: initial;
            }
        }
    }

    &__group {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

        .card-input__input {
            flex: 1;
            margin-right: 15px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    &__button {
        width: 100%;
        height: 55px;
        background: #2364d2;
        border: none;
        border-radius: 5px;
        font-size: 22px;
        font-weight: 500;
        font-family: "Source Sans Pro", sans-serif;
        box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
        color: #fff;
        margin-top: 20px;
        cursor: pointer;

        @media screen and (max-width: 480px) {
            margin-top: 10px;
        }
    }
}


.card-input {
    margin-bottom: 20px;

    &__label {
        font-size: 14px;
        margin-bottom: 5px;
        font-weight: 500;
        color: #1a3b5d;
        width: 100%;
        display: block;
        user-select: none;
    }

    &__input {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        box-shadow: none;
        border: 1px solid #ced6e0;
        transition: all 0.3s ease-in-out;
        font-size: 18px;
        padding: 5px 15px;
        background: none;
        color: #1a3b5d;
        font-family: "Source Sans Pro", sans-serif;

        &:hover,
        &:focus {
            border-color: #3d9cff;
        }

        &:focus {
            box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
        }

        &.-select {
            -webkit-appearance: none;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC');
            background-size: 12px;
            background-position: 90% center;
            background-repeat: no-repeat;
            padding-right: 30px;
        }
    }
}

.slide-fade-up-enter-active {
    transition: all 0.25s ease-in-out;
    transition-delay: 0.1s;
    position: relative;
}

.slide-fade-up-leave-active {
    transition: all 0.25s ease-in-out;
    position: absolute;
}

.slide-fade-up-enter {
    opacity: 0;
    transform: translateY(15px);
    pointer-events: none;
}

.slide-fade-up-leave-to {
    opacity: 0;
    transform: translateY(-15px);
    pointer-events: none;
}

.slide-fade-right-enter-active {
    transition: all 0.25s ease-in-out;
    transition-delay: 0.1s;
    position: relative;
}

.slide-fade-right-leave-active {
    transition: all 0.25s ease-in-out;
    position: absolute;
}

.slide-fade-right-enter {
    opacity: 0;
    transform: translateX(10px) rotate(45deg);
    pointer-events: none;
}

.slide-fade-right-leave-to {
    opacity: 0;
    transform: translateX(-10px) rotate(45deg);
    pointer-events: none;
}



.github-btn {
    position: absolute;
    right: 40px;
    bottom: 50px;
    text-decoration: none;
    padding: 15px 25px;
    border-radius: 4px;
    box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65);
    background: #24292e;
    color: #fff;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 16px;
    text-align: center;
    transition: all .3s ease-in-out;

    @media screen and (min-width: 500px) {
        &:hover {
            transform: scale(1.1);
            box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
        }
    }

    @media screen and (max-width: 700px) {
        position: relative;
        bottom: auto;
        right: auto;
        margin-top: 20px;

        &:active {
            transform: scale(1.1);
            box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
        }
    }
}
</style>
