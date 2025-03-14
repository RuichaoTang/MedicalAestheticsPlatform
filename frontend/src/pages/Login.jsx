import Header from '../components/Header';
import { Field, Label, Switch } from '@headlessui/react'
import { Link } from 'react-router-dom';

export default function Login() {

  return (
    <>
    <Header />
    <div className=" px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">LOG IN</h2>
        <p className="mt-2 text-lg/8 text-gray-600">Create an account for yourself - Customer or Clinic Owner.</p>
      </div>
      <form action="" method="POST" className="mx-auto mt-16 sm:mt-20 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
         
         
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
              Email
            </label>
            <div className="mt-1.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-900">
              Password
            </label>
            <div className="mt-1.5">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="passowrd"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
            </div>
          </div>
          <div className="flex sm:col-span-2">
            
            <div className="text-sm/6 text-gray-600">
              Doesn't have an account?{' '}
              <Link to="/register" className="font-semibold text-indigo-600">
                Create&nbsp;Account
              </Link>
              .
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            LOG IN
          </button>
        </div>
      </form>
    </div>
    </>
  )
}
