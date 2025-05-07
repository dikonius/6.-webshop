
const EditProduct = () => {


	return (
		<main>
			<form>
				<h1>Edit Product</h1>

				<label htmlFor="title">Title</label>
				<input type="text" id="title" name="title" value="Super Mario Deluxe" required />

				<label htmlFor="description">Description</label>
				<textarea id="description" name="description" rows="5" required value={'Text area'} />

				<button type="submit">Save changes</button>
			</form>
		</main>
	)
}
export default EditProduct
