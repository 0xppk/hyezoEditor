<script lang="ts">
	export let modalDiv: HTMLDialogElement;
</script>

<dialog bind:this={modalDiv} class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<h3 class="text-lg font-bold">Hello!</h3>
		<p class="py-4">Press ESC key or click outside to close</p>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
