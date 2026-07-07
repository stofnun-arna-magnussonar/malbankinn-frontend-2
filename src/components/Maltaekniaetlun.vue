<template>
    <h1 class="about-title" v-html="$translate('maltaekniaetlunTitle')"></h1>
    <div class="about-text-container">
        
        <div class="about-subcontainer">
            <div class="about-subtitle-container">
                <p class="about-subtitle" v-html="$translate('maltaekniaetlunBeginningTitle')"></p>
            </div>
            <p class="about-text" v-html="$translate('maltaekniaetlunBeginningContent')"></p>
        </div>

        <div class="about-subcontainer">
            <div class="about-subtitle-container">
                <p class="about-subtitle" v-html="$translate('maltaekniaetlunExecutionTitle')"></p>
            </div>
            <p class="about-text" v-html="$translate('maltaekniaetlunExecutionContent')"></p>
        </div>

        <div class="about-subcontainer">
            <div class="about-subtitle-container">
                <p class="about-subtitle" v-html="$translate('maltaekniaetlunMilestonesTitle')"></p>
            </div>
            <p class="about-text" v-html="$translate('maltaekniaetlunMilestonesContent')"></p>
            <span></span>
            <div class="vordur-list">
                <div class="varda"><p class="bullet">•</p><a href="/public/media/uploads/varda1_full_is.pdf" target="_blank" v-html="$translate('maltaekniaetlunMilestone1')"></a></div>
                <div class="varda"><p class="bullet">•</p><a href="/public/media/uploads/varda2_full_is.pdf" target="_blank" v-html="$translate('maltaekniaetlunMilestone1')"></a></div>
                <div class="varda"><p class="bullet">•</p><a href="/public/media/uploads/varda4_full_is.pdf" target="_blank" v-html="$translate('maltaekniaetlunMilestone1')"></a></div>
                <div class="varda"><p class="bullet">•</p><a href="/public/media/uploads/varda6_full_is.pdf" target="_blank" v-html="$translate('maltaekniaetlunMilestone1')"></a></div>
                <div class="varda"><p class="bullet">•</p><a href="/public/media/uploads/varda7_full_is.pdf" target="_blank" v-html="$translate('maltaekniaetlunMilestone1')"></a></div>
                <div class="varda"><p class="bullet">•</p><a href="/public/media/uploads/varda8_samantekt_is.pdf" target="_blank" v-html="$translate('maltaekniaetlunMilestone1')"></a></div>
                <div class="varda"><p class="bullet">•</p><a href="/public/media/uploads/varda9_full_is.pdf" target="_blank" v-html="$translate('maltaekniaetlunMilestone1')"></a></div>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    name: 'Maltaekniaetlun'
}
</script>

<style scoped>
.about-subcontainer {
  display: grid;
  grid-template-columns: 1fr 8fr;
}
.vordur-list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-left: 40px;
}
.varda {
    display: flex;
    gap: 5px;
}
.bullet {
    color: var(--primary-blue);
}
@media (max-width: 768px) {
  .about-subcontainer {
    display: flex;
    flex-direction: column;
  }
  .vordur-list {
    margin-left: 0px;
  }
}
</style>