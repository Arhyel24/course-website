import Image from "next/image";

export default function Admin() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold">Welcome, Kristin</h1>
          <p className="text-gray-500">Your personal dashboard overview</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
              placeholder="Search"
              type="text"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <i className="fas fa-bell text-gray-400"></i>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              alt="Profile picture of Kristin Watson"
              className="w-12 h-12 rounded-full"
              height={50}
              src="https://storage.googleapis.com/a1aa/image/yiUHfbAey1htWUUF0MnpTi1LkvEzHFfuB6MAdOd7Jj1e9LpOB.jpg"
              width={50}
            />
            <div>
              <h2 className="text-lg font-semibold">Kristin Watson</h2>
              <p className="text-gray-500">Design Manager</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <i className="fas fa-heart text-red-500"></i>
              <span>11</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-users text-blue-500"></i>
              <span>56</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-briefcase text-yellow-500"></i>
              <span>12</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-6 rounded-lg shadow text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Prioritized tasks</h2>
            <i className="fas fa-tasks"></i>
          </div>
          <div className="text-4xl font-bold">83%</div>
          <p className="text-sm">Avg. Completed</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-lg shadow text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Additional tasks</h2>
            <i className="fas fa-tasks"></i>
          </div>
          <div className="text-4xl font-bold">56%</div>
          <p className="text-sm">Avg. Completed</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Trackers connected</h2>
          <div className="flex space-x-2">
            <i className="fab fa-google text-gray-500"></i>
            <i className="fab fa-apple text-gray-500"></i>
            <i className="fab fa-microsoft text-gray-500"></i>
            <i className="fas fa-ellipsis-h text-gray-500"></i>
          </div>
        </div>
        <p className="text-gray-500">3 active connections</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow col-span-1 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Focusing</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Range:</span>
              <select className="bg-gray-100 rounded-full py-1 px-3 focus:outline-none">
                <option>Last month</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="text-gray-500">Maximum of focus</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span className="text-gray-500">Min or lack of focus</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="text-center">
                <div className="text-lg font-semibold">Week 8</div>
                <div className="text-gray-500">Unbalanced</div>
              </div>
            </div>
            <Image
              alt="Graph showing focus data over time"
              className="w-full h-48 object-cover"
              height={200}
              src="https://storage.googleapis.com/a1aa/image/0heZm4qBefGbspthgfZLvezVjWhbVeI0pirPl82EtDI92vk6E.jpg"
              width={600}
            />
          </div>
          <div className="text-right mt-4">
            <div className="text-4xl font-bold">41%</div>
            <p className="text-gray-500">Avg. Conc-ion</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">My meetings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-500">Tue, 11 Jul</div>
                <div className="font-semibold">Quick Daily Meeting</div>
                <div className="text-gray-500">08:15 am</div>
              </div>
              <i className="fas fa-external-link-alt text-gray-500"></i>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-500">Tue, 11 Jul</div>
                <div className="font-semibold">John Onboarding</div>
                <div className="text-gray-500">09:30 pm</div>
              </div>
              <i className="fas fa-external-link-alt text-gray-500"></i>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-500">Tue, 12 Jul</div>
                <div className="font-semibold">Call With a New Team</div>
                <div className="text-gray-500">02:30 pm</div>
              </div>
              <i className="fas fa-external-link-alt text-gray-500"></i>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-500">Tue, 15 Jul</div>
                <div className="font-semibold">Lead Designers Event</div>
                <div className="text-gray-500">04:00 pm</div>
              </div>
              <i className="fas fa-external-link-alt text-gray-500"></i>
            </div>
          </div>
          <div className="text-right mt-4">
            <a className="text-blue-500" href="#">
              See all meetings
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-lg font-semibold mb-4">Developed areas</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-500">Sport Skills</div>
            <div className="w-1/2 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 w-[71%] h-2 rounded-full"></div>
            </div>
            <div className="text-gray-500">71%</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500">Blogging</div>
            <div className="w-1/2 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 w-[92%] rounded-full"></div>
            </div>
            <div className="text-gray-500">92%</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500">Leadership</div>
            <div className="w-1/2 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 w-[33%] rounded-full"></div>
            </div>
            <div className="text-gray-500">33%</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500">Meditation</div>
            <div className="w-1/2 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 w-[56%] rounded-full"></div>
            </div>
            <div className="text-gray-500">56%</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500">Philosophy</div>
            <div className="w-1/2 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 w-[70%] rounded-full"></div>
            </div>
            <div className="text-gray-500">70%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
