import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//fetchUserById
export const fetchUserById = createAsyncThunk(
    "user/fetchUserById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://66bc5bfe24da2de7ff6a2f52.mockapi.io/users/books/${id}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }
            const result = await response.json();
            console.log(result); // Debugging line
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Update user data
export const updateUser = createAsyncThunk(
    'updateUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://66bc5bfe24da2de7ff6a2f52.mockapi.io/users/books/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to update user");
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message); // Ensure you handle error messages properly
        }
    }
);

// create action
export const createPost = createAsyncThunk('createPost', async (data, { rejectWithValue }) => {

    const response = await fetch("https://66bc5bfe24da2de7ff6a2f52.mockapi.io/users/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

//read action
export const showUser = createAsyncThunk(
    "showUser",
    async (args, { rejectWithValue }) => {
        const response = await fetch(
            "https://66bc5bfe24da2de7ff6a2f52.mockapi.io/users/books"
        );

        try {
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//update Data


// export const updateUser = createAsyncThunk(
//     'updateUser',
//     async (data, { rejectWithValue }) => {
//         const response = await fetch(
//             `https://66bc5bfe24da2de7ff6a2f52.mockapi.io/users/books/${data.id}`,
//             {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             }
//         );

//         try {
//             const result = await response.json();
//             return result;
//         } catch (error) {
//             return rejectWithValue(error.response);
//         }
//     }
// );


export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
        const response = await fetch(
            `https://66bc5bfe24da2de7ff6a2f52.mockapi.io/users/books/${id}`,
            { method: "DELETE" }
        );

        try {
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const userDetail = createSlice({
    name: 'userDetailReducer',
    initialState: {
        user: null, // store for single user
        users: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // show data
            .addCase(showUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //delete action
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.users = state.users.filter((ele) => ele.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete user';;
            })


            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous errors
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Store the fetched user data
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store the error message
            })

            // Update user
            // In your slice
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous errors
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload; // Update the user in the users list
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Handle error
            });

    },
})

export default userDetail.reducer;
