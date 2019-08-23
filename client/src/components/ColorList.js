import React, { useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../components/utils/axiosWithAuth';

const initialColor = {
	color: '',
	code: { hex: '' }
};

const ColorList = ({ colors, updateColors, getColors }) => {

	const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  
  console.log('colorToEdit', colorToEdit);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
	};

  // takes the click event and calls saveEdit on that event with the event action and colorToEdit
  const onSaveEdit = (event) => {
    saveEdit(event, colorToEdit)
  }
	//the current color to save is in the colorToEdit State so add it to the params
	const saveEdit = (event, colorToEdit) => {
		console.log('saveEdit', colorToEdit);
		event.preventDefault();
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
		axiosWithAuth()
			.put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
			.then(res => {
				console.log(res.data);
				//update colors is setColorsList from BubblePage and is the updated state
				// colors is the colorsList from BubblePage that is the current state
				updateColors(
					colors.map(color => (color.id != colorToEdit.id ? color : res.data))
				);
			})
			.catch(err => {
				console.log(err.response);
			});

		
	};


  
	const deleteColor = color => {
		// make a delete request to delete this color
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/${color.id}`)
			.then(res => updateColors(res.data))
			.catch(err => console.error(err));
	};

	return (
		<div className='colors-wrap'>
			<p>colors</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span className='delete' onClick={() => deleteColor(color)}>
								x
							</span>{' '}
							{color.color}
						</span>
						<div
							className='color-box'
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={e =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className='button-row'>
						<button type='submit' onClick={onSaveEdit}>save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className='spacer' />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
