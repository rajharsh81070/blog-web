import {
  Avatar,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Textarea,
  Typography,
} from '@material-tailwind/react'
import React, { useEffect, useMemo } from 'react'
import Button from '../../components/button/Button'
import { AccessToken } from '../../constants'
import {
  useCreateBlogMutation,
  useLazyGetAllBlogsQuery,
} from '../../api/blogs.api'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IBlog } from '../../api/types'
import { getFirstTwoLines, getTimeAgo } from '../../utils/utils'
import Spinner from '../../components/spinner/Spinner'
import { useLogoutUserMutation } from '../../api/auth.api'
import { clearLocalStorageItem } from '../../utils/localStorage'
import { logout } from '../../redux/slice/user.slice'
import { setToast } from '../../redux/slice/global.slice'
import { ToastType } from '../../components/toast/Toast'

const Feed: React.FC = () => {
  const [content, setContent] = React.useState<string>('')
  const [title, setTitle] = React.useState<string>('')
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false)
  const [blog, setBlog] = React.useState<IBlog | null>(null)

  const { userState, blogState } = useSelector((state: RootState) => state)
  const { user } = userState
  const { blogs } = blogState

  const [fetchAllBlog, { isFetching: isFetchAllBlog }] =
    useLazyGetAllBlogsQuery()
  const [createBlog, { isLoading: createBlogLoading }] = useCreateBlogMutation()
  const [logoutUser] = useLogoutUserMutation()
  const dispatch = useDispatch()

  const isDataLoading = useMemo(() => isFetchAllBlog, [isFetchAllBlog])

  useEffect(() => {
    fetchAllBlog(null)
  }, [fetchAllBlog])

  const handleBlogClick = (blog: IBlog | null) => {
    setBlog(blog)
    setOpenDrawer(!openDrawer)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setContent(value)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setTitle(value)
  }

  const handleCreateBlog = () => {
    createBlog({ content: content.trim(), title: title.trim() }).then(() => {
      setContent('')
      setTitle('')
      fetchAllBlog(null)
      dispatch(
        setToast({
          message: 'Blog created successfully!!',
          type: ToastType.Success,
          duration: 3000,
        })
      )
    })
  }

  const handleLogout = () => {
    logoutUser().then(() => {
      dispatch(logout())
      clearLocalStorageItem(AccessToken)
    })
  }

  const renderHeader = () => {
    return (
      <div className="flex w-full flex-col items-start flex-shrink gap-3">
        <div className="flex w-full items-center justify-between">
          <p className="text-[#C5C7CA] font-medium text-[28px]">
            Hello {user?.name}
          </p>
          <Menu>
            <MenuHandler>
              <Avatar
                variant="circular"
                alt={user?.name ?? 'user'}
                placeholder={user?.name ?? 'user'}
                className="cursor-pointer w-7 h-7"
                src="https://avatars.githubusercontent.com/u/0"
              />
            </MenuHandler>
            <MenuList placeholder={user?.name ?? 'user'}>
              <Typography
                onClick={handleLogout}
                variant="small"
                className="font-medium cursor-pointer"
                placeholder={user?.name ?? 'user'}
              >
                Sign Out
              </Typography>
            </MenuList>
          </Menu>
        </div>
      </div>
    )
  }

  const renderCreateBlog = () => {
    return (
      <div className="bg-[#27292D] w-full border-solid rounded-lg border-2 border-[#35373B] flex flex-col px-5 py-6 gap-4">
        <div className="flex w-full items-center">
          <p className="text-[#C5C7CA] text-lg font-sans font-medium">
            Create Blog
          </p>
        </div>
        <div className="bg-[#191920] p-2 rounded-lg flex items-start justify-start">
          <Textarea
            rows={1}
            value={title}
            resize={false}
            placeholder="Title"
            className="min-h-full !border-0 focus:border-transparent placeholder:text-[#7F8084] !text-[#7F8084] !text-base !font-sans !font-normal"
            containerProps={{
              className: 'grid h-full',
            }}
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            onChange={handleTitleChange}
          />
        </div>
        <div className="bg-[#191920] p-2 rounded-lg flex items-start justify-start">
          <Textarea
            rows={1}
            value={content}
            resize={false}
            placeholder="Content"
            className="min-h-full !border-0 focus:border-transparent placeholder:text-[#7F8084] !text-[#7F8084] !text-base !font-sans !font-normal"
            containerProps={{
              className: 'grid h-full',
            }}
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            onChange={handleContentChange}
          />
        </div>
        <div className="w-full flex items-end justify-end">
          <div className="w-[112px]">
            <Button
              label="Create"
              disabled={
                (content.trim().length === 0 && title.trim().length === 0) ||
                createBlogLoading
              }
              onClick={handleCreateBlog}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderDrawer = () => {
    return (
      <Dialog
        placeholder={'Dialog Box'}
        size="md"
        open={openDrawer}
        className="flex flex-col max-h-[75vh] bg-[#27292D]"
        handler={() => handleBlogClick(null)}
      >
        <DialogHeader placeholder={'Dialog box header'}>
          <div className="flex w-full items-center justify-center">
            <div className="flex grow-1 w-full items-start">
              <div className="flex gap-4 items-center justify-start flex-shrink-0">
                <img
                  src="https://avatars.githubusercontent.com/u/0"
                  alt="avatar"
                  height={44}
                  width={44}
                  className="rounded-[44px] w-11 h-11 bg-[lightgray]"
                />
                <div className="flex flex-col">
                  <p className="text-[#C5C7CA] text-base font-sans font-medium">
                    {blog?.authorName}
                  </p>
                  <p className="text-[#7F8084] text-sm font-sans font-medium">
                    {getTimeAgo(blog?.createdAt ?? new Date().toString())}
                  </p>
                </div>
              </div>
            </div>
            <IconButton
              variant="text"
              className="text-white"
              placeholder={'close icon'}
              size="lg"
              onClick={() => handleBlogClick(null)}
            >
              <i className="fas fa-close" />
            </IconButton>
          </div>
        </DialogHeader>
        <DialogBody placeholder={'Dialog box body'} className="h-full">
          <div className="bg-[#191920] p-4 rounded-lg gap-4 flex flex-col items-start justify-start h-auto">
            <p className="text-[#7F8084] break-all text-lg font-sans font-bold">
              {blog?.title}
            </p>
            <div className="max-h-[42vh] overflow-y-scroll">
              <p className="text-[#7F8084] break-all text-base font-sans font-normal">
                {blog?.content}
              </p>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    )
  }

  const renderBlog = (blog: IBlog) => {
    return (
      <div
        key={blog.id}
        className="bg-[#27292D] md:w-[700px] cursor-pointer w-full border-solid rounded-lg border-2 border-[#35373B] flex flex-col px-5 py-6 gap-4"
        onClick={() => handleBlogClick(blog)}
      >
        <div className="flex w-full items-start">
          <div className="flex gap-4 items-center justify-start flex-shrink-0">
            <img
              src="https://avatars.githubusercontent.com/u/0"
              alt="avatar"
              height={44}
              width={44}
              className="rounded-[44px] w-11 h-11 bg-[lightgray]"
            />
            <div className="flex flex-col">
              <p className="text-[#C5C7CA] text-base font-sans font-medium">
                {blog.authorName}
              </p>
              <p className="text-[#7F8084] text-sm font-sans font-medium">
                {getTimeAgo(blog?.createdAt ?? new Date().toString())}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#191920] p-4 rounded-lg gap-4 flex flex-col items-start justify-start">
          <p className="text-[#7F8084] break-all text-lg font-sans font-bold">
            {blog.title}
          </p>
          <p className="text-[#7F8084] break-all text-base font-sans font-normal">
            {blog.content.split('.').length >= 2
              ? getFirstTwoLines(blog.content) + '...'
              : blog.content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#131319] p-4 flex sm:items-center flex-col overflow-scroll min-h-screen w-full h-full">
      <div className="flex flex-col md:w-[700px] gap-4">
        {renderHeader()}
        <div className="flex flex-col flex-shrink gap-4">
          {renderCreateBlog()}
          {isDataLoading ? (
            <div className="flex items-center justify-center">
              <Spinner containerHeight="h-full" size={24} />
            </div>
          ) : (
            blogs.map((blog) => renderBlog(blog))
          )}
          {!isDataLoading && (
            <div className="flex w-full items-center justify-center">
              <div className="flex-grow border-t-[1px] border-solid border-[#7F8084]" />
              <p className="mx-1 text-[#7F8084] text-base font-sans font-normal">
                That's it!!
              </p>
              <div className="flex-grow border-t-[1px] border-solid border-[#7F8084]" />
            </div>
          )}
        </div>
      </div>
      {renderDrawer()}
    </div>
  )
}

export default Feed
