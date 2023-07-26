<script lang="ts">
	export let modalDiv: HTMLDialogElement;
	export let selectedAchive: string;
</script>

<dialog bind:this={modalDiv} class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="title">{selectedAchive}</h3>
		<p class="description">Press ESC key or click outside to close</p>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<style>
	.modal {
		width: 100%;
	}

	.modal-box {
		background-color: #fff;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.title {
		font-size: var(--fs-lg);
	}

	.description {
		padding: 0 1rem;
	}

	.modal-backdrop {
		backdrop-filter: blur(0.5rem);
	}
</style>
