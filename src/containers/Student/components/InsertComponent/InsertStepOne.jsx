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
import {notifyError,notifySuccess} from '../../../../shared/components/Notifications';
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
  departmentId: Yup.string()
    .required("Không bỏ trống trường này"),
  classId: Yup.string()
    .required("Không bỏ trống trường này"),
});

const StudentInsertStepOne = (props) => { 

  const [studentState, setStudentState] = useRecoilState(studentGlobalState);

  const { setToInsertPage } = props;

  const [classList, setClassList] = useState([]);

  useEffect(() => {
    console.log(props.prepareDepartmentList);
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
      <Formik
        initialValues={{
          classId: '',
          departmentId: '',
          fullName: '',
          sex: '',
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
          courseNumber: '',
          religion:''

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
          let formData = new FormData();
          formData.append("departmentId",values.departmentId );
          formData.append("classId", values.classId);
          formData.append("fullName", values.fullName);
          formData.append("sex", values.sex);
          formData.append("dateBirth", values.dateBirth);
          formData.append("nationality", values.nationality);
          formData.append("ethnic",values.ethnic);
          formData.append("homeAddress", values.otherAddress + " " +  values.commune + " " + values.district + " " + values.city + " " + values.country);
          formData.append("fatherName", values.fatherName);
          formData.append("fatherWork", values.fatherWork);
          formData.append("fatherDateBirth", values.fatherDateBirth);
          formData.append("motherName", values.motherName);
          formData.append("motherWork", values.motherWork);
          formData.append("motherDateBirth", values.motherDateBirth);
          formData.append("phoneNumber", values.phoneNumber);
          formData.append("familyPhoneNumber", values.familyPhoneNumber);
          formData.append("email", values.email);
          formData.append("religion", values.religion);
          console.log(formData);
          axios.post("/student/insert", formData)
          .then(res =>{
            notifySuccess("Tạo mới thành công !!!")
            props.setToInsertPage(false);
            props.setForceRerender(values => values = !values)
          })
          .catch(err => {
            notifyError("Tạo mới thất bại")
            props.setToInsertPage(false);
            props.setToInsertPage(false);
          })
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
                  <Label for="departmentId">Khoa<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                  <Input
                    type="select"
                    name="departmentId"
                    id="departmentId"
                    onBlur={formProps.handleBlur}
                    invalid={formProps.touched.departmentId && !!formProps.errors.departmentId}
                    valid={formProps.touched.departmentId && !formProps.errors.departmentId}
                    required value={formProps.values.departmentId}
                    onChange={(e) => {
                      console.log(e.target.value);
                      if (e.target.value !== '') {
                        let values = {
                          departmentId: e.target.value,
                        };
                        formProps.setValues(Object.assign(formProps.values, values));
                        var formData = new FormData();
                        formData.append("departmentId", e.target.value);
                        axios.post("/class/getAll", formData)
                          .then(res =>
                            setClassList(res.data.content)
                          )
                          .catch(setClassList([]));
                      }
                      else {
                        let values = {
                          departmentId: '',
                          classId: ''
                        };
                        formProps.setValues(Object.assign(formProps.values, values));
                      }
                    }}
                  >
                    <option key={"departmentIdNan"} value={''}>{"Chọn khoa..."}</option>)
                    {
                      props.prepareDepartmentList.map(item =>
                        item !== undefined ?
                          <option
                            key={"departmentId" + item.value}
                            value={item.value}>
                            {item.label}
                          </option> : ""
                      )}
                  </Input>
                  <FormFeedback >{formProps.touched.departmentId === true ? formProps.errors.departmentId : ""}</FormFeedback>
                </FormGroup>

                {
                  formProps.values.departmentId !== '' ?
                    <FormGroup>
                      <Label for="classId">Lớp<Tooltip placement="topLeft" title="Không được để trống trường này"><span className="text-danger">*</span></Tooltip></Label>
                      <Input
                        type="select"
                        name="classId"
                        id="classId"
                        onBlur={formProps.handleBlur}
                        invalid={formProps.touched.classId && !!formProps.errors.classId}
                        valid={formProps.touched.classId && !formProps.errors.classId}
                        required value={formProps.values.classId}
                        onChange={formProps.handleChange}
                      >
                        <option key={"classIdNaN"} value={''}>{"Chọn lớp..."}</option>)
                        {
                          classList.map(item =>
                            item !== undefined ? <option key={"classId" + item.classId} value={item.classId}>{item.classId + " " + item.className}</option> : ""
                          )
                        }
                      </Input>
                      <FormFeedback >{formProps.touched.classId === true ? formProps.errors.classId : ""}</FormFeedback>
                    </FormGroup> : ""
                }

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
                    <option key={"sexNaN"} value={''}>{"Giới tính"}</option>)
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
                          country: selected[0].label
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
                        if (formProps.values.country === 'Việt Nam') {
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
                    formProps.values.country === 'Việt Nam'
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
                              city: selected[0].label
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
                    formProps.values.country === "Việt Nam" ?
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
                              district: selected[0].label
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
                    formProps.values.country === 'Việt Nam' ?
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
                              commune: selected[0].label
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
                  <Label for="religion">Tôn giáo</Label>
                      <Input
                        type="text"
                        name="religion"
                        id="religion"
                        placeholder="Nhập tôn giáo..."
                        onChange={formProps.handleChange}
                        value={formProps.values.religion}
                        onBlur={formProps.handleBlur}
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
                  <Label for="familyPhoneNumber">Số điện thoại gia đình</Label>
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
              <Button type="primary" className="wizard_button" onClick={() => setToInsertPage(value => value = false)}><LeftOutlined />Quay lại</Button>
              <Button
                className="wizard_button"
                type="primary"
                htmlType="submit"
                disabled={formProps.isSubmitting}
                >
                {formProps.isSubmitting ? "Xử lý..." : "Lưu"}
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
