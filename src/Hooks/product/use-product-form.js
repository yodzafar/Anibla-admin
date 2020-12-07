import {useFormik} from 'formik'
import {
    useCallback, useEffect, useMemo, useState
} from 'react';
import * as Yup from 'yup'
import {useDispatch} from 'react-redux';
import genre from '../../Service/genre'
import member from '../../Service/member'
import category from '../../Service/category'
import product from '../../Service/product'
import {getProductList} from '../../Models/product';
import {BASE_URL, URL_TITLE} from '../../Constants/url'
import {hideModal} from '../../Models/app';
import {showSnackbar} from "../../Models/app/actions";
import {imgObgj, readFileAsDataURL} from "../../utils/imageSize";
import {imageExtValidate} from "../../utils/ext-validate";

const baseUrl = process.env.REACT_APP_BASE_URL

const statusOptions = [
    {
        id: '1',
        name: "Saytda ko'rsatish"
    },
    {
        id: '0',
        name: "Saytda ko'rsatmaslik"
    }
]

const priceOptions = [
    {
        id: 'free',
        name: "To'lovsiz"
    },
    {
        id: 'selling',
        name: "To'lovli"
    }
]


export const useProductForm = ({type, id}) => {
    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [step, setStep] = useState(1)
    const [allowNextStep, setAllowNextStep] = useState(false)
    const [genreOptions, setGenreOptions] = useState([])
    const [genreLoading, setGenreLoading] = useState(false)
    const [memberOptions, setMemberOptions] = useState([])
    const [memberLoading, setMemberLoading] = useState(false)
    const [categoryOptions, setCategoryOptions] = useState([])
    const [categoryLoading, setCategoryLoading] = useState(false)
    const [initialValues, setInitialValues] = useState({
        nameuz: '',
        nameru: '',
        descriptionuz: '',
        descriptionru: '',
        video: type === 'serial'? 'https://www.youtube.com/watch?v=CqODvF5itbQ' : '',
        category: [],
        translator: [],
        cover: undefined,
        sliderImg: undefined,
        screens: [],
        length: type === 'serial' ? '00:00:00' : '',
        year: '',
        country: '',
        tarjimon: [],
        tayming: [],
        rejissor: '',
        studia: '',
        janr: [],
        status: '1',
        type,
        price: 'free'
    });

    const validationSchema = new Yup.object().shape({
        nameuz: Yup.string().required("Maydon to'ldirilishi shart"),
        nameru: Yup.string().required("Maydon to'ldirilishi shart"),
        descriptionuz: Yup.string().required("Maydon to'ldirilishi shart"),
        descriptionru: Yup.string().required("Maydon to'ldirilishi shart"),
        video: Yup.string().test('url_test', 'URL xato kiritilgan', (video) => {
            const regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
            const without_regex = new RegExp("^([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
            return (regex.test(video) || without_regex.test(video))
        }),
        length: Yup.string()
            .matches(/^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$/, "Video davomiyligi 00:00:00 kabi bo'lishi talab qilinadi"),
        year: Yup.string().required("Maydon to'ldirilishi shart"),
        country: Yup.string().required("Maydon to'ldirilishi shart"),
        janr: Yup.array().required("Maydon to'ldirilishi shart"),
        translator: Yup.array().required("Maydon to'ldirilishi shart"),
        tarjimon: Yup.array().required("Maydon to'ldirilishi shart"),
        tayming: Yup.array().required("Maydon to'ldirilishi shart"),
        rejissor: Yup.string().required("Maydon to'ldirilishi shart"),
        studia: Yup.string().required("Maydon to'ldirilishi shart"),
        screens: Yup.array().required("Maydon to'ldirilishi shart")
            .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (files) => {
                let isMatch = true
                for (let i = 0; i < files.length; i++) {
                    if (typeof files[i] === 'string') {
                        break
                    }
                    if (files[i].type !== 'image/jpeg' && files[i].type !== 'image/png') {
                        isMatch = false
                        break
                    }
                }

                return files && isMatch
            }),
        sliderImg: Yup.mixed()
            .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (file) => (
                file && typeof file === 'string'
                    ? imageExtValidate(file)
                    : file && (file.type === 'image/jpeg' || file.type === 'image/png')))
            .test('sliderImageSize', "Slider rasmi o'lchami 1440x600 talab etiladi", async (file) => {
                if (file && typeof file !== 'string') {
                    const base64Url = await readFileAsDataURL(file)
                    const image = await imgObgj(base64Url)
                    return image.naturalWidth === 1440 && image.naturalHeight === 600
                }
                return true
            }).required("Maydon to'ldirilishi shart"),
        cover: Yup.mixed()
            .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (file) => (
                file && typeof file === 'string'
                    ? imageExtValidate(file)
                    : file && (file.type === 'image/jpeg' || file.type === 'image/png')))
            .test('coverImageSize', "Muqova rasmi width/height 0.7dan katta 0.8 kichik bo'lishi talab etiladi",
                async (file) => {
                    if (file && typeof file !== "string") {
                        const base64Url = await readFileAsDataURL(file)
                        const image = await imgObgj(base64Url)
                        return (image.naturalWidth / image.naturalHeight) >= 0.7
                            && (image.naturalWidth / image.naturalHeight) <= 0.8
                    }
                    return true
                }).required("Maydon to'ldirilishi shart"),
        category: Yup.array().required("Maydon to'ldirilishi shart"),
        status: Yup.string().required("Maydon to'ldirilishi shart"),
        type: Yup.string().required("Maydon to'ldirilishi shart"),
        price: Yup.string().required("Maydon to'ldirilishi shart")
    })

    const getTitle = (kinoType) => {
        switch (kinoType) {
            case 'treyler':
                return URL_TITLE.TRAILER.TITLE
            case 'serial':
                return URL_TITLE.SERIAL.TITLE
            default:
                return URL_TITLE.FILM.TITLE
        }
    }

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            if (!id) {
                const data = new FormData()
                const {janr, translator, cover, sliderImg, screens, tayming, tarjimon, category} = values
                const images = [cover, sliderImg, ...screens]

                data.append('nameuz', values.nameuz)
                data.append('nameru', values.nameru)
                data.append('descriptionuz', values.descriptionuz)
                data.append('descriptionru', values.descriptionru)
                data.append('year', values.year)
                data.append('country', values.country)
                data.append('status', !!Number(values.status))
                data.append('type', values.type)
                data.append('price', values.price)
                data.append('rejissor', values.rejissor)
                data.append('studia', values.studia)

                if (type !== 'serial') {
                    data.append('video', values.video)
                }

                if (!id) {
                    for (let i = 0; i < images.length; i++) {
                        data.append('images', images[i])
                    }
                }

                for (let i = 0; i < janr.length; i++) {
                    data.append('janr[]', janr[i])
                }

                for (let i = 0; i < category.length; i++) {
                    data.append('category[]', category[i])
                }

                for (let i = 0; i < translator.length; i++) {
                    data.append('translator[]', translator[i])
                }

                for (let i = 0; i < tarjimon.length; i++) {
                    data.append('tarjimon[]', tarjimon[i])
                }

                for (let i = 0; i < tayming.length; i++) {
                    data.append('tayming[]', tayming[i])
                }

                product.createProduct(data)
                    .then((res) => {
                        if (res.success) {
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `${getTitle()} muvaffaqiyatli qo'shildi`
                            }
                            dispatch(showSnackbar(payload))
                            dispatch(getProductList({type}))
                            resetForm()
                            setStep(1)
                        }
                    }).finally(() => setSubmitting(false))
                    .catch(() => {
                        const payload = {
                            open: true,
                            variant: 'error',
                            message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                        }
                        dispatch(showSnackbar(payload))
                        setSubmitting(false)
                    })
            } else {
                const data = {
                    nameuz: values.nameuz,
                    nameru: values.nameru,
                    descriptionuz: values.descriptionuz,
                    descriptionru: values.descriptionru,
                    category: values.category,
                    translator: values.translator,
                    year: values.year,
                    country: values.country,
                    janr: values.janr,
                    status: !!Number(values.status),
                    type: values.type,
                    price: values.price,
                    rejissor: values.rejissor,
                    tarjimon: values.tarjimon,
                    studia: values.studia,
                    tayming: values.tayming
                }


                if (type !== 'serial') {
                    data.video = values.video
                    data.length = values.length
                }

                product.updateProduct({id, data})
                    .then((res) => {
                        if (res.success) {
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `${getTitle(type)} muvaffaqiyatli tahrirlandi`
                            }
                            dispatch(showSnackbar(payload))
                            dispatch(getProductList({type}))
                            resetForm()
                            setStep(1)
                            dispatch(hideModal())
                        }
                    })
                    .finally(() => setSubmitting(false))
                    .catch(() => {
                        const payload = {
                            open: true,
                            variant: 'error',
                            message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                        }
                        dispatch(showSnackbar(payload))
                        setSubmitting(false)
                    })
            }
        }
    });

    const getGenre = useCallback(() => {
        setGenreLoading(true)
        genre.getAllGenre()
            .then((res) => {
                const data = res.data.map((item) => ({
                    id: item._id,
                    name: item.nameuz
                }))
                setGenreOptions(data)
            })
            .finally(() => setGenreLoading(false))
            .catch(() => {
                setGenreLoading(false)
            })
    }, [])

    const getMember = useCallback(() => {
        setMemberLoading(true)
        member.getAllMember()
            .then((res) => {
                const data = res.data.map((item) => ({
                    id: item._id,
                    name: item.name,
                    img: `${baseUrl}${item.image}`
                }))
                setMemberOptions(data)
            })
            .finally(() => setMemberLoading(false))
            .catch(() => {
                setMemberLoading(false)
            })
    }, [])

    const getCategory = useCallback(() => {
        setCategoryLoading(true)
        category.getAllCategory()
            .then((res) => {
                const data = res.data.map((item) => ({
                    id: item._id,
                    name: item.nameuz
                }))
                setCategoryOptions(data)
            })
            .finally(() => setCategoryLoading(false))
            .catch(() => {
                setCategoryLoading(false)
            })
    }, [])

    const nextStep = useCallback(() => {
        if (!id) {
            setStep(2)
        }
    }, [id])

    const getProduct = useCallback(() => {
        if (id) {
            product.getProduct(id)
                .then((res) => {
                    const {data} = res

                    const values = {
                        nameuz: data.name.uz,
                        nameru: data.name.ru,
                        descriptionuz: data.description.uz,
                        descriptionru: data.description.ru,
                        year: data.year,
                        country: data.country,
                        status: data.status === 'true' ? '1' : '0',
                        video: data.video ? data.video : 'https://google.com',
                        janr: data.janr,
                        translator: data.translator.map(item => item._id),
                        category: data.category.map(item => item._id),
                        cover: data.image,
                        sliderImg: data.screens.length > 0 && `${BASE_URL}/${data.screens[0]}`,
                        screens: data.screens.slice(1).map((item) => `${BASE_URL}/${item}`),
                        price: data.price,
                        type,
                        studia: data.studia,
                        length: data.video ? data.video : '00:00:00',
                        rejissor: data.rejissor,
                        tarjimon: data.tarjimon.map(item => item._id),
                        tayming: data.tayming.map(item => item._id),
                    }
                    setInitialValues(values)
                }).catch((e) => {
                console.log(e);
            })
        }
    }, [id, type])

    const submitDisabled = () => formik.isSubmitting
        || (formik.touched.nameru && !!formik.errors.nameru)
        || (formik.touched.nameuz && !!formik.errors.nameuz)
        || (formik.touched.descriptionru && !!formik.errors.descriptionru)
        || (formik.touched.descriptionuz && !!formik.errors.descriptionuz)
        || (formik.touched.video && !!formik.errors.video)
        || (formik.touched.category && !!formik.errors.category)
        || (formik.touched.year && !!formik.errors.year)
        || (formik.touched.janr && !!formik.errors.janr)
        || (formik.touched.translator && !!formik.errors.translator)
        || (formik.touched.cover && !!formik.errors.cover)
        || (formik.touched.sliderImg && !!formik.errors.sliderImg)
        || (!!formik.errors.screens)
        || (formik.touched.status && !!formik.errors.status)
        || (formik.touched.price && !!formik.errors.price)
        || (formik.touched.type && !!formik.errors.type)

    useMemo(() => {
        getGenre()
        getMember()
        getCategory()
    }, [getGenre, getMember, getCategory])

    useEffect(() => {
        const errData = Object.keys(formik.errors)
        const tmp = {}
        for (let i = 0; i < errData.length; i++) {
            if (formik.touched[errData[i]]) {
                if (errData[i].indexOf('uz') !== -1) {
                    tmp.uz = true
                }

                if (errData[i].indexOf('ru') !== -1) {
                    tmp.ru = true
                }
            }
        }
        setError(tmp);
    }, [formik.errors, formik.touched])


    useEffect(() => {
        getProduct()
    }, [getProduct])

    useEffect(() => {
        const status =
            formik &&
            (
                formik.values.nameuz.trim().length === 0
                || formik.values.nameru.trim().length === 0
                || formik.values.descriptionuz.trim().length === 0
                || formik.values.descriptionru.trim().length === 0
                || formik.values.year.trim().length === 0
                || formik.values.country.trim().length === 0
                || formik.values.status.trim().length === 0
                || formik.values.type.trim().length === 0
                || formik.values.price.trim().length === 0
                || formik.values.rejissor.trim().length === 0
                || formik.values.studia.trim().length === 0
                || formik.values.janr.length === 0
                || formik.values.translator.length === 0
                || formik.values.tarjimon.length === 0
                || formik.values.tayming.length === 0
                || formik.values.category.length === 0
            )
        setAllowNextStep(status)
    }, [formik])

    return {
        formik,
        genreOptions,
        genreLoading,
        error,
        memberOptions,
        memberLoading,
        categoryOptions,
        categoryLoading,
        submitDisabled,
        statusOptions,
        priceOptions,
        nextStep,
        step,
        allowNextStep,
        getTitle
    }
}
