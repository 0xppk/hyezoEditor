<script lang="ts">
</script>

<div class="fixed inset-0 mx-auto grid max-w-md place-items-center px-5">
	<div class="alert border border-black/20">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="h-6 w-6 shrink-0 stroke-info"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span>
			<slot name="message" />
		</span>
		<div>
			<slot name="button" />
		</div>
	</div>
</div>
