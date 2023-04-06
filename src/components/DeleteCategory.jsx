// Project files
import { deleteDocument } from "../scripts/fireStore";
import { useCategory } from "../state/useCategory";


export default function DeleteCategory({ path, id }) {
  // Global state
  const { setModal,dispatch } = useCategory();
  

  // Method
  async function onConfirm() {
    document.getElementById("delete-btn").disabled = true;
    const result = await deleteDocument(path, id);    
    result.status ? onSuccess() : onFailure(result.message);
  }

  function onSuccess() {
    dispatch({ type: 'DELETE_ITEM', payload: id });
    document.getElementById("delete-btn").disabled = false;
    setModal(null);
  }

  function onFailure(errorMessage) {
    document.getElementById("delete-btn").disabled = false;
    alert(errorMessage);
  }

  return (
    <div className="deletecategory">
      <h1>Delete item</h1>
      <p>
        ℹ️ Warning, deleting the item is a permanent action. Press the button
        below if you are sure about it
      </p>
      <button onClick={onConfirm} id="delete-btn">Confirm</button>
    </div>
  );
}
