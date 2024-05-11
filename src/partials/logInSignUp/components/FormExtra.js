export default function FormExtra({TogglePassword}){
    return(
      <>
       <div className="flex ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-slate-900 focus:ring-slate-500 border-gray-300 rounded"
            onChange={TogglePassword}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Show Password
          </label>
        </div>


       
      </div>
        <div className="flex flex-col items-end justify-end ">
       


        <div className="text-sm">
          <a href="/signup" className="font-medium text-blue-500">
            Signup?
          </a>
        </div>
      </div>
      </>

    )
}