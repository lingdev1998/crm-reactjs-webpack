import React, { useState, useEffect } from 'react';
import { ButtonToolbar, Col, Form, FormFeedback, FormGroup, Label, Input, Row } from 'reactstrap';
import { Cascader, Button, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import * as Yup from "yup";
import { Formik } from "formik";
import 'antd/dist/antd.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useRecoilState } from 'recoil';
import { studentGlobalState } from '../../../../localState/studentState';
import axios from 'axios';

import './InsertComponent.scss';

const nameRegExp = /^(?=.{0,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;
const sexRegExp = /^(0|1)$/;
const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, `Ít nhất 3 ký tự`)
    .matches(nameRegExp, 'Họ tên không hợp lệ !!!')
    .required('Không bỏ trống trường này'),
  dateBirth: Yup.string()
    .required('Không bỏ trống trường này'),
  sex: Yup.string()
    .matches(sexRegExp, 'Vui lòng chọn giới tính')
    .required('Không bỏ trống trường này'),
  nationality: Yup.string()
    .min(1, "Không bỏ trống trường này").required("Không bỏ trống trường này"),
  country: Yup.string()
    .required("Không bỏ trống trường này"),
  city: Yup.string()
    .required("Không bỏ trống trường này"),
  district: Yup.string()
    .required("Không bỏ trống trường này"),
  commune: Yup.string()
    .required("Không bỏ trống trường này"),
});

const schema = Yup.object().shape({
  departmentId: Yup.string()
    .required("Không bỏ trống trường này"),
  classId: Yup.string()
    .required("Không bỏ trống trường này"),
  courseNumber: Yup.string()
    .required("Không bỏ trống trường này"),
})

const StudentInsertStepOne = (props) => {
  // const onSubmit = (values, { setSubmitting, setErrors }) => {
  //   console.log(values);
  // };

  const [studentState, setStudentState] = useRecoilState(studentGlobalState);

  const { setToInsertPage } = props;

  const [classDepartmentErr, setClassDepartmentErr] = useState(null);
  const [classDepartmentTouched, setClassDepartmentTouched] = useState(false);
  useEffect(() => {
    console.log('render');
    return () => {
      let defaultGlobalState = {
        cityList: [],
        districtList: [],
        communeList: [],
        ethnicList: [],

      }
      setStudentState(Object.assign(studentState, defaultGlobalState));
    }
  }, [])

  return (
    <div>
      <hr />
      <Formik
        initialValues={{
          fullName: '',
          sex: '-1',
          dateBirth: '',
          nationality: '',
          ethnic: '',
          country: '',
          city: '',
          district: '',
          commune: '',
          otherAddress: '',
          fatherName: "",
          fatherDateBirth: '',
          fatherWork: '',
          motherName: '',
          motherDateBirth: '',
          motherWork: '',
          phoneNumber: '',
          familyPhoneNumber: '',
          email: '',
          classDepartment: {
            classId: '',
            departmentId: '',
            courseNumber: ''

          },
        }}
        initialErrors={
          {
            classDepartment: ""
          }
        }
        initialTouched={
          {
            fullName: false,
            sex: false,
            dateBirth: false,
            nationality: false,
            ethnic: false,
            country: false,
            city: false,
            district: false,
            commune: false,

          }
        }
        onSubmit={(values, actions) => {
          console.log(values)
        }}
        validationSchema={SignupSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(formProps) => (
          <Form style={{ paddingLeft: "40px", paddingRight: "40px" }} onSubmit={formProps.handleSubmit} noValidate name="simpleForm">
            <Row>
              <Col md={6}>

                <FormGroup>
                  <Label for="classDepartment">Khoa/Khoá/Lớp<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  <Cascader
                    onBlur={() => setClassDepartmentTouched(true)}
                    style={{ width: '100%' }}
                    defaultValue={formProps.values.classDepartment.departmentId && formProps.values.classDepartment.courseNumber && formProps.values.classDepartment.classId ? [formProps.values.classDepartment.departmentId, formProps.values.classDepartment.courseNumber, formProps.values.classDepartment.classId] : []}
                    options={props.prepareDepartmentList}
                    placeholder="Khoa/Khoá/Lớp..."
                    name="classDepartment"
                    className={classDepartmentErr !== null ? (classDepartmentErr === '' ? " form-control form-cascader is-valid" : " form-control form-cascader is-invalid") : ""}
                    onChange={(selected) => {
                      if (Array.isArray(selected) && selected.length > 1) {
                        let object = {
                          classDepartment: {
                            departmentId: selected[0],
                            courseNumber: selected[1],
                            classId: selected[2]
                          },
                          courseNumber: selected[1],
                        }
                        formProps.setValues(Object.assign(formProps.values, object))
                        schema.validate(formProps.values.classDepartment)
                          .then(res => setClassDepartmentErr(""))
                          .catch(err => setClassDepartmentErr("Không hợp lệ."));
                        console.log(classDepartmentErr);
                      }
                      else {
                        let object = {
                          classDepartment: {
                            departmentId: '',
                            courseNumber: '',
                            classId: ''
                          },
                        }
                        formProps.setValues(Object.assign(formProps.values, object))
                        schema.validate(formProps.values.classDepartment)
                          .then(res => setClassDepartmentErr(""))
                          .catch((err) => {
                            setClassDepartmentErr("Không hợp lệ.")
                          });
                        console.log(classDepartmentErr);
                      }
                    }}
                  />
                  <div className="invalid-feedback">{classDepartmentErr}</div>
                </FormGroup>

                <FormGroup>
                  <Label for="fullName">Họ và tên<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Họ và tên..."
                    required
                    onChange={formProps.handleChange}
                    value={formProps.values.fullName}
                    invalid={formProps.touched.fullName && !!formProps.errors.fullName}
                    valid={formProps.touched.fullName && !formProps.errors.fullName}
                    onBlur={formProps.handleBlur}
                  />
                  <FormFeedback >{formProps.touched.fullName === true ? formProps.errors.fullName : ""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="sex">Giới tính<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  <Input
                    type="select"
                    name="sex"
                    id="sex"
                    onBlur={formProps.handleBlur}
                    invalid={formProps.touched.sex && !!formProps.errors.sex}
                    valid={formProps.touched.sex && !formProps.errors.sex}
                    required value={formProps.values.sex}
                    onChange={formProps.handleChange}
                  >
                    <option key={"NaN"} value={-1}>{"Giới tính"}</option>)
                        <option key={"sex0"} value={0}>{"Nam"}</option>)
                        <option key={"sex1"} value={1}>{"Nữ"}</option>)
                      </Input>
                  <FormFeedback>{formProps.touched.sex === true ? formProps.errors.sex : ""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="dateBirth">Ngày sinh<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  <Input
                    type="date"
                    name="dateBirth"
                    id="dateBirth"
                    placeholder="Ngày sinh..."
                    required
                    onChange={formProps.handleChange}
                    value={formProps.values.dateBirth}
                    invalid={formProps.touched.dateBirth && !!formProps.errors.dateBirth}
                    valid={formProps.touched.dateBirth && !formProps.errors.dateBirth}
                    onBlur={formProps.handleBlur}
                  />
                  <FormFeedback>{formProps.touched.dateBirth === true ? formProps.errors.dateBirth : ""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="nationality">Quốc tịch<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  <Typeahead
                    id="basic-typeahead-single"
                    labelKey="label"
                    name="nationality"
                    onBlur={() => {
                      let touched = {
                        nationality: true
                      }
                      formProps.setTouched(Object.assign(formProps.touched, touched))
                    }}
                    isInvalid={formProps.touched.nationality && !!formProps.errors.nationality}
                    isValid={formProps.touched.nationality && !formProps.errors.nationality}
                    onChange={(selected) => {
                      if (Array.isArray(selected) && selected.length) {
                        let object = {
                          nationality: selected[0].id
                        }
                        formProps.setValues(Object.assign(formProps.values, object))
                        axios.get("/ethnic/findByCountryId?keySearch=" + selected[0].id).then(response => {
                          let update = {
                            ethnicList: response.data
                          }
                          setStudentState(Object.assign(studentState, update));
                        }).catch(err => {
                          setStudentState(Object.assign(studentState, {}));
                        });
                      }
                      else {
                        let object = {
                          nationality: ''
                        }
                        formProps.setValues(Object.assign(formProps.values, object))
                      }
                    }}
                    options={studentState.nationalityList}
                    placeholder="Chọn quốc tịch..."
                  />
                  <FormFeedback>{formProps.touched.nationality === true ? formProps.errors.nationality : ""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="ethnic">Dân tộc</Label>
                  <Typeahead
                    id="basic-typeahead-single"
                    labelKey="label"
                    name="ethnic"
                    onChange={(selected) => {
                      if (Array.isArray(selected) && selected.length) {
                        let object = {
                          ethnic: selected[0].id
                        }
                        formProps.setValues(Object.assign(formProps.values, object))
                      }
                      else {
                        let object = {
                          ethnic: ''
                        }
                        formProps.setValues(Object.assign(formProps.values, object))
                      }
                    }}
                    options={studentState.ethnicList}
                    placeholder="Chọn dân tộc..."
                  />
                  <FormFeedback>{formProps.touched.ethnic === true ? formProps.errors.ethnic : ""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="country">Quốc gia<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  <Typeahead
                    id="basic-typeahead-single"
                    labelKey="label"
                    name="country"
                    onBlur={() => {
                      let touched = {
                        country: true
                      }
                      formProps.setTouched(Object.assign(formProps.touched, touched))
                    }}
                    isInvalid={formProps.touched.country && !!formProps.errors.country}
                    isValid={formProps.touched.country && !formProps.errors.country}
                    onChange={(selected) => {
                      if (Array.isArray(selected) && selected.length) {
                        let object = {
                          country: selected[0].id
                        }
                        if (selected[0].id === 'VNM') {
                          object.city = ''
                        }
                        formProps.setValues(Object.assign(formProps.values, object))
                        axios.get("/provinceCity/findByCountry?keySearch=" + selected[0].id).then(response => {
                          let update = {
                            cityList: response.data
                          }
                          setStudentState(Object.assign(studentState, update));
                        }).catch(err => {
                          setStudentState(Object.assign(studentState, {}));
                        });
                      }
                      else {
                        let object = {
                          country: ''
                        }
                        if (formProps.values.country === 'VNM') {
                          object.city = ''
                        }
                        formProps.setValues(Object.assign(formProps.values, object))
                      }
                    }}
                    options={studentState.countryList}
                    placeholder="Chọn quốc gia sinh sống..."
                  />
                  <FormFeedback>{formProps.touched.country === true ? formProps.errors.country : ""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="city">Thành phố/Tỉnh<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  {
                    formProps.values.country === 'VNM'
                      ?
                      <Typeahead
                        id="basic-typeahead-single"
                        labelKey="label"
                        name="city"
                        onBlur={() => {
                          let touched = {
                            city: true
                          }
                          formProps.setTouched(Object.assign(formProps.touched, touched))
                        }}
                        isInvalid={formProps.touched.city && !!formProps.errors.city}
                        isValid={formProps.touched.city && !formProps.errors.city}
                        onChange={(selected) => {
                          if (Array.isArray(selected) && selected.length) {
                            let object = {
                              city: selected[0].id
                            }
                            formProps.setValues(Object.assign(formProps.values, object))
                            axios.get("/district/findByProvinceCityId?keySearch=" + selected[0].id).then(response => {
                              let update = {
                                districtList: response.data
                              }
                              setStudentState(Object.assign(studentState, update));
                            }).catch(err => {
                              setStudentState(Object.assign(studentState, {}));
                            });
                          }
                          else {
                            let object = {
                              city: ''
                            }
                            formProps.setValues(Object.assign(formProps.values, object))
                          }
                        }}
                        options={studentState.cityList}
                        placeholder="Chọn thành phố..."
                      /> :
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Nhập tên thành phố..."
                        required
                        onChange={formProps.handleChange}
                        value={formProps.values.city}
                        invalid={formProps.touched.city && !!formProps.errors.city}
                        valid={formProps.touched.city && !formProps.errors.city}
                        onBlur={formProps.handleBlur}
                      />
                  }
                  <FormFeedback>{formProps.touched.city === true ? formProps.errors.city : ""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="district">Quận/Huyện<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  {
                    formProps.values.country === "VNM" ?
                      <Typeahead
                        id="basic-typeahead-single"
                        labelKey="label"
                        name="district"
                        onBlur={() => {
                          let touched = {
                            district: true
                          }
                          formProps.setTouched(Object.assign(formProps.touched, touched))
                        }}
                        isInvalid={formProps.touched.district && !!formProps.errors.district}
                        isValid={formProps.touched.district && !formProps.errors.district}
                        onChange={(selected) => {
                          if (Array.isArray(selected) && selected.length) {
                            let object = {
                              district: selected[0].id
                            }
                            formProps.setValues(Object.assign(formProps.values, object))
                            axios.get("/commune/findByDistrictId?keySearch=" + selected[0].id).then(response => {
                              let update = {
                                communeList: response.data
                              }
                              setStudentState(Object.assign(studentState, update));
                            }).catch(err => {
                              setStudentState(Object.assign(studentState, {}));
                            });
                          }
                          else {
                            let object = {
                              district: ''
                            }
                            formProps.setValues(Object.assign(formProps.values, object))
                          }
                        }}
                        options={studentState.districtList}
                        placeholder="Chọn quận/huyện..."
                      /> :
                      <Input
                        type="text"
                        name="district"
                        id="district"
                        placeholder="Nhập tên quận/huyện..."
                        required
                        onChange={formProps.handleChange}
                        value={formProps.values.district}
                        invalid={formProps.touched.district && !!formProps.errors.district}
                        valid={formProps.touched.district && !formProps.errors.district}
                        onBlur={formProps.handleBlur}
                      />
                  }
                  <FormFeedback>{formProps.touched.district === true ? formProps.errors.district : ""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="commune">Phường/Xã<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  {
                    formProps.values.country === 'VNM' ?
                      <Typeahead
                        id="basic-typeahead-single"
                        labelKey="label"
                        name="commune"
                        onBlur={() => {
                          let touched = {
                            commune: true
                          }
                          formProps.setTouched(Object.assign(formProps.touched, touched))
                        }}
                        isInvalid={formProps.touched.commune && !!formProps.errors.commune}
                        isValid={formProps.touched.commune && !formProps.errors.commune}
                        onChange={(selected) => {
                          if (Array.isArray(selected) && selected.length) {
                            let object = {
                              commune: selected[0].id
                            }
                            formProps.setValues(Object.assign(formProps.values, object))
                          }
                          else {
                            let object = {
                              commune: ''
                            }
                            formProps.setValues(Object.assign(formProps.values, object))
                          }

                        }}
                        options={studentState.communeList}
                        placeholder="Chọn phường/xã..."
                      /> :
                      <Input
                        type="text"
                        name="commune"
                        id="commune"
                        placeholder="Nhập tên phường/xã..."
                        required
                        onChange={formProps.handleChange}
                        value={formProps.values.commune}
                        invalid={formProps.touched.commune && !!formProps.errors.commune}
                        valid={formProps.touched.commune && !formProps.errors.commune}
                        onBlur={formProps.handleBlur}
                      />
                  }
                  <FormFeedback>{formProps.touched.commune === true ? formProps.errors.commune : ""}</FormFeedback>
                </FormGroup>

              </Col>

              <Col md={6}>

                <FormGroup>
                  <Label for="otherAddress">Thôn/Tổ </Label>
                  <Input
                    type="text"
                    name="otherAddress"
                    id="otherAddress"
                    placeholder="Thôn, xóm, tổ..."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.otherAddress}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="fatherName">Họ và tên (Bố) </Label>
                  <Input
                    type="text"
                    name="fatherName"
                    id="fatherName"
                    placeholder="Họ và tên của bố..."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.fatherName}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="fatherDateBirth">Năm sinh (Bố)  </Label>
                  <Input
                    type="number"
                    name="fatherDateBirth"
                    id="fatherDateBirth"
                    placeholder="Năm sinh của bố..."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.fatherDateBirth}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="fatherWork">Nghề nghiệp (Bố) </Label>
                  <Input
                    type="text"
                    name="fatherWork"
                    id="fatherWork"
                    placeholder="Nghề nghiệp của bố.."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.fatherWork}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>


                <FormGroup>
                  <Label for="motherName">Họ và tên (Mẹ)  </Label>
                  <Input
                    type="text"
                    name="motherName"
                    id="motherName"
                    placeholder="Họ và tên của mẹ..."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.motherName}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="motherDateBirth">Năm sinh (Mẹ)  </Label>
                  <Input
                    type="number"
                    name="motherDateBirth"
                    id="motherDateBirth"
                    placeholder="Năm sinh của mẹ..."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.motherDateBirth}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="motherWork">Nghề nghiệp (Mẹ)  </Label>
                  <Input
                    type="text"
                    name="motherWork"
                    id="motherWork"
                    placeholder="Nghề nghiệp của mẹ..."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.motherWork}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="phoneNumber">Số điện thoại cá nhân   </Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Số điện thoại cá nhân..."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.phoneNumber}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="familyPhoneNumber">Số điện thoại gia đình<span className="text-danger">*</span>  </Label>
                  <Input
                    type="text"
                    name="familyPhoneNumber"
                    id="familyPhoneNumber"
                    placeholder="Số điện thoại gia đình..."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.familyPhoneNumber}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="email">Địa chỉ email  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Địa chỉ email..."
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    value={formProps.values.email}
                  />
                  <FormFeedback>{""}</FormFeedback>
                </FormGroup>

              </Col>
            </Row>

            <ButtonToolbar className="form__button-toolbar wizard__toolbar" style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary" className="wizard_button" onClick={() => setToInsertPage(false)}><LeftOutlined />Quay lại</Button>
              <Button
                className="wizard_button"
                type="primary"
                htmlType="submit"
                disabled={!(formProps.classId !== '' && formProps.setDepartmentId !== '' && formProps.courseNumber !== '')}
              >
                Tiếp
                <RightOutlined />
              </Button>
            </ButtonToolbar>
          </Form>
        )}
      </Formik>
    </div >
  );
};

export default StudentInsertStepOne;
