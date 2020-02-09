<template>
  <b-navbar-nav>
    <b-nav-item :to="{name: 'forcontrol'}">{{ $t('forcontrol') }}</b-nav-item>
    <b-nav-item-dropdown :text="$t('manageemployee') " right>
      <b-dropdown-item :to="{name: 'createemployee'}">{{ $t('createemployee') }}</b-dropdown-item>
      <b-dropdown-item :to="{name: 'deleteoreditemployee'}">{{ $t('deltoreditemployee') }}</b-dropdown-item>
    </b-nav-item-dropdown>
    <b-nav-item :to="{name: 'changePass'}">{{ $t('changePass') }}</b-nav-item>
    <b-nav-item :to="{name: 'login'}">{{ $t('logout') }}</b-nav-item>
  </b-navbar-nav>
</template>
