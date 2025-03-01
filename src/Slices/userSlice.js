import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user:{
        firstName:'Anurag',
        lastName:'Meena',
        userName:'anuragmeena2431',
        email:'anuragmeena31@gmail.com',
        bio:'Full Stack Developer',
        mobileNo:'9302150511',
        img:'https://media.licdn.com/dms/image/v2/D4E03AQGxd5auujKUdw/profile-displayphoto-shrink_400_400/B4EZN35FAFH0Ak-/0/1732883272981?e=1746057600&v=beta&t=eFukPyg7e_7oC5CZjyz9igSrciVFJoz4vHUzwDT2uJc',
        linkedinUrl:'https://www.linkedin.com/in/anurag-meena-2570622bb',
        courses:[
       'Data Structures & Algorithm' , 'App Development' ,  'Python'
        ],
        friends:[
            {
                name: 'Balram Meena',
                img:'https://media.licdn.com/dms/image/v2/D4E03AQEbD2_0jRmNAA/profile-displayphoto-shrink_100_100/B4EZVHdUisHcAU-/0/1740660625642?e=2147483647&v=beta&t=cXD01gbX28kyKCFPt9HVEIVB4K50zFDpbjcaIb6N8Ks'
            },
            {
                name: 'Ashif Pathan',
                img:'https://media.licdn.com/dms/image/v2/D5603AQGQVvx5ic6SFA/profile-displayphoto-shrink_400_400/B56ZVB_vk4GsAg-/0/1740568985338?e=1746057600&v=beta&t=Qm34m9YBFWwq4ErfZ02-MiO0GwvyLPhVvr4NlfzqHWY'
            },
            {
                name: 'Yash Nayak',
                img:'https://media.licdn.com/dms/image/v2/D5603AQEZOCansLtrDQ/profile-displayphoto-shrink_100_100/B56ZVG2kvoGQAY-/0/1740650470934?e=2147483647&v=beta&t=dLAYju9pHPjKRNnU8-c2Yfe-qpfq_A8ChX_fSFt3jRA'
            },
                
          
        ],
        questions:[
            'rat in a maze' , 'variables' , 'data types' , 'for loop'
        ],
        details:{
            gender:'',
            dob:'',
            college:''
        }
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, action) {
            state.user = { ...state.user, ...action.payload };
        },
        addCourse(state, action) {
            state.user.courses.push(action.payload);
        },
        removeCourse(state, action) {
            state.user.courses = state.user.courses.filter(course => course !== action.payload);
        },
        addFriend(state, action) {
            state.user.friends.push(action.payload);
        },
        removeFriend(state, action) {
            state.user.friends = state.user.friends.filter(friend => friend !== action.payload);
        }
    }
});

export const { updateUser, addCourse, removeCourse, addFriend, removeFriend } = userSlice.actions;

export default userSlice.reducer;