

const AddProduct = () => {
	

	return (
		<main>
		<form noValidate onSubmit={null}>
			<h1>Add new product</h1>

			<label htmlFor="add-title"> Title </label>
			<input
				type="text"
				id="add-title"
				name="add-title"
				required
				value={form.title}
				onChange={event => setForm({ ...form, title: event.target.value })}
				/>
			<div className="error-message"> {message.title} </div>

			<label htmlFor="add-description"> Description </label>
			<textarea
				id="add-description"
				name="add-description"
				rows="5"
				required
				value={form.description}
				onChange={event => setForm({ ...form, description: event.target.value })}
				/>
			<div className="error-message"> {message.description} </div>

			<button type="submit"
				disabled={!formIsValid}
				onClick={submitForm}
				>Save</button>
		</form>
		</main>
	)
}
export default AddProduct
