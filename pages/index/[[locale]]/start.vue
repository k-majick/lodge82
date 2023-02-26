<template>
  <h2 class="main__title">{{ $t("pages.start.title") }}</h2>

  <CalendarMonth />
</template>

<script lang="ts" setup>
import CalendarMonth from "@/components/CalendarMonth.vue";

// import { Types } from "ably";
// import * as Ably from "ably/promises";

// (async () => {
//     const optionalClientId = "optionalClientId";
//     // When not provided in authUrl, a default will be used.
//     const connection = new Ably.Realtime.Promise({ authUrl: `/.netlify/functions//ably-token-request?clientId=${optionalClientId}` });
//     const channel = connection.channels.get("getting-started");

//     await channel.subscribe((msg: Types.Message) => {
//       console.log(msg); //eslint-disable-line
//     });

//     channel.publish("hello-world-message", { message: "Hello world!" });
// })();
</script>
