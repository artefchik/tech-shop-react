import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNewCommentFormText = (state:StateSchema) => state.addNewCommentForm?.text;
