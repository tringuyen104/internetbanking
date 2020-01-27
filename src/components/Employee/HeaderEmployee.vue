<template>
  <b-navbar-nav>
    <b-nav-item :to="{name: 'createuser'}">{{ $t('createuser') }}</b-nav-item>
    <b-nav-item :to="{name: 'recharge'}">{{ $t('recharge') }}</b-nav-item>
    <b-nav-item :to="{name: 'exchangehistory'}">{{ $t('exchangehistory') }}</b-nav-item>
    <b-nav-item :to="{name: 'login'}">{{ $t('logout') }}</b-nav-item>
  </b-navbar-nav>
</template>
