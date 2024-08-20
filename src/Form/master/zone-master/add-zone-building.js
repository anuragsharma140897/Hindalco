import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import useValidation from '../../../Hooks/useValidation';
import { zoneMasterSchema } from '../../../Utils/validators/master/zone-master/zone-master-scheema';
import { setZoneMasterApiJson } from '../../../Store/Action/master/zone-master/zone-master-action';
import SearchSelect from '../../../Component/ui/form/select/search-select';
import { getBuildingMasterColumns } from '../../../WebView/master/buildings-master/building-column';
import { useColumn } from '../../../Hooks/use-column';
import { searchBuilding, updateZone } from '../../../Constant/Api/Api';
import { setBuildingMasterData } from '../../../Store/Action/master/building-master/building-master-action';
import { CompileBuildingMaster } from '../../../WebView/master/buildings-master/promiss/building-master.promiss';
import { useModal } from '../../../shared/modal-views/use-modal';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { TableClass } from '../../../Constant/Classes/Classes';
import { HitApi } from '../../../Store/Action/Api/ApiAction';

function AddZoneBuilding() {
    const [loading, setLoading] = useState(false);
    const [buildingOptions, setBuildingOptions] = useState([]);
    const reduxZone = useSelector(state => state.ZoneMasterReducer);
    const reduxBuilding = useSelector(state => state.BuildingMasterReducer);
    const { errors, validate } = useValidation(zoneMasterSchema);
    const dispatch = useDispatch();
    const { openModal, closeModal } = useModal();

    const columns = useMemo(() => getBuildingMasterColumns({ openModal, closeModal, hide: true }), [openModal, closeModal]);
    const { visibleColumns } = useColumn(columns);

    useEffect(() => {
        if (reduxBuilding?.doc === null || buildingOptions.length === 0) {
            loadData();
        }
    }, [reduxBuilding?.doc, buildingOptions]);

    const loadData = async () => {
        setLoading(true);
        try {
            HitApi(reduxBuilding?.searchJson, searchBuilding).then((result) =>{
                if (result) {
                    const options = result.content.map(building => ({
                        label: building.buildingName,
                        value: building.id
                    }));
                    setBuildingOptions(options);
                    CompileBuildingMaster(result).then(res=>{
                        dispatch(setBuildingMasterData(result));
                    });
                }
            })
        } catch (error) {
            console.error('Error fetching building data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const json = { ...reduxZone?.apiJson };
        const validationErrors = validate(json);



        setLoading(true);
        HitApi(json, updateZone).then((result) => {
            if (result?.status === 200) {
                alert(result.message || 'Update successful');
                window.location.pathname = '/master/zone';
            } else {
                console.error('API Error:', result);
                alert(result.message || 'Something went wrong');
            }
        });

    };



    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                {buildingOptions.length > 0 ? (
                    <div className="space-y-5 lg:space-y-6">
                        <div>
                            <SearchSelect
                                name="id"
                                label="Select Building"
                                options={buildingOptions}
                                error={errors}
                                placeholder="Select Building"
                                reduxState={reduxZone.apiJson}
                                setAction={setZoneMasterApiJson}
                                validate={validate}
                            />
                            <ControlledTable
                                variant="modern"
                                isLoading={loading}
                                showLoadingText={true}
                                data={reduxBuilding?.doc?.content}
                                columns={visibleColumns}
                                className={TableClass}
                            />
                        </div>
                        <div className='flex gap-3 justify-end'>
                            <CustomButton text='Cancel' variant='flat' onClick={closeModal} />
                            <CustomButton type='submit' text='Submit' loading={loading} />
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </form>
        </div>
    );
}

export default AddZoneBuilding;
