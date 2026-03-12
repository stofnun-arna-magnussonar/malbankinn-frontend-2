<template>
    <div class="footer-container">
        <div class="footer-content">

            <div class="footer-row">
                <img class="footer-symbol" src="/symbols/ARN_myndmerki_svart.svg">
                <a class="blue-text-link" href="https://www.arnastofnun.is/" v-html="$translate('footerAMI')"></a>
            </div>

            <div class="footer-row">
                <img class="footer-symbol" src="/symbols/Logo-BW14-compact-CLARIN.png">
                <a class="blue-text-link" href="https://www.clarin.is">CLARIN-IS</a>
            </div>
            
            
            <div class="footer-row">
                <img class="footer-symbol" src="/symbols/email-address-icon.svg">
                <a class="blue-text-link" href="mailto:clarin@clarin.is">malbankinn@arnastofnun.is</a>
            </div>
            
            <!-- <div class="footer-row">
                <img class="footer-symbol" src="/symbols/phone-icon.svg">
                <p>525-5116</p>
            </div> -->
            
            <!-- <div class="footer-row">
                <img class="footer-symbol" src="/symbols/address-book-black-icon.svg">
                <span>
                    <a class="blue-text-link" href="mailto:starkadur.barkarson@arnastofnun.is">Starkaður Barkarson, landsfulltrúi</a>;
                    <a class="blue-text-link" href="mailto:samuel.thorisson@arnastofnun.is">Samúel Þórisson, tölvunarfræðingur</a>
                    
                </span>
            </div> -->
            <!-- <div class="footer-row">
                <img class="footer-symbol" src="/symbols/home-icon.svg">
                <p>Arngrímsgata 5, 105 Reykjavík</p>
            </div> -->

        </div>
        <span></span>
    </div>
</template>

<style scoped>
.footer-container {
    width: 100%;
}

.footer-content {
    margin-left: 50px;
    margin-right: 50px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid var(--primary-light-blue);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}

.footer-row {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

.footer-symbol {
    height: 1.5rem;
    filter: invert(27%) sepia(94%) saturate(445%) hue-rotate(180deg) brightness(94%) contrast(82%);
    /* filter: invert(80%) sepia(55%) saturate(3835%) hue-rotate(354deg) brightness(96%) contrast(94%); */
}

@media (max-width: 768px) {
  .footer-content {
    display: none;
  }
}

</style>