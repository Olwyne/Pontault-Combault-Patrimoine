<template>
    <div id="notification" class=" notification"> 
        <span class="col ">
                Une nouvelle version de l'application est disponible. 
        </span>
        <span class="col notification-link" @click="reloadWindow">
            Recharger
        </span> 
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name:'Notification',
        props:['balade'],
        methods:{
            ... mapActions([
                'setActiveTitle'
            ]),
            reloadWindow(){
                window.location.reload();
            }
           
        }
    }
</script>

<style>
  #notification{
      display: none;
  }

  .notification {
  background-color: #404040;
  font-size:20px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding: 15px 26px;
  position: relative;
  display: inline-block;
  border-radius: 2px;
  width: 100%;
}
.notification-link{
    text-transform: uppercase;
    color: #5b9bd5;
}

.notification .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background: red;
  color: white;
}
</style>